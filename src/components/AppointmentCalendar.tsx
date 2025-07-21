import { useState, useEffect } from "react";
import { format, addDays, startOfWeek, isSameDay } from "date-fns";
import { es } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Clock, User, Phone, Calendar as CalendarIcon } from "lucide-react";
import { useCookies } from "@/hooks/useCookies";
import { mockDoctors } from "@/data/mockData";
import { Doctor, Appointment, TimeSlot } from "@/types/appointment";
import { useToast } from "@/hooks/use-toast";

export function AppointmentCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [patientName, setPatientName] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const { getJsonCookie, setJsonCookie } = useCookies();
  const { toast } = useToast();

  const weekDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];

  useEffect(() => {
    const savedAppointments = getJsonCookie<Appointment[]>('appointments') || [];
    setAppointments(savedAppointments);
  }, []);

  const getDayKey = (date: Date): string => {
    const dayIndex = date.getDay();
    const dayMap = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    return dayMap[dayIndex];
  };

  const getAvailableTimeSlots = (doctor: Doctor, date: Date): TimeSlot[] => {
    const dayKey = getDayKey(date);
    const slots = doctor.schedule[dayKey] || [];
    
    // Check if there are existing appointments for this doctor and date
    const existingAppointments = appointments.filter(
      apt => apt.doctorId === doctor.id && apt.date === format(date, 'yyyy-MM-dd')
    );
    
    return slots.map(slot => ({
      ...slot,
      available: slot.available && !existingAppointments.some(apt => apt.time === slot.time)
    }));
  };

  const handleTimeSlotClick = (doctor: Doctor, time: string) => {
    setSelectedDoctor(doctor);
    setSelectedTime(time);
    setIsDialogOpen(true);
  };

  const handleBookAppointment = () => {
    if (!selectedDoctor || !selectedTime || !patientName || !patientPhone) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos",
        variant: "destructive"
      });
      return;
    }

    const newAppointment: Appointment = {
      id: `apt_${Date.now()}`,
      doctorId: selectedDoctor.id,
      doctorName: selectedDoctor.name,
      specialty: selectedDoctor.specialty,
      date: format(selectedDate, 'yyyy-MM-dd'),
      time: selectedTime,
      patientName,
      patientPhone,
      status: 'confirmed'
    };

    const updatedAppointments = [...appointments, newAppointment];
    setAppointments(updatedAppointments);
    setJsonCookie('appointments', updatedAppointments);

    toast({
      title: "Cita Reservada",
      description: `Cita confirmada para ${patientName} el ${format(selectedDate, 'dd/MM/yyyy')} a las ${selectedTime}`,
    });

    // Reset form
    setPatientName("");
    setPatientPhone("");
    setSelectedTime("");
    setSelectedDoctor(null);
    setIsDialogOpen(false);
  };

  const getTodayAppointments = (): Appointment[] => {
    const today = format(new Date(), 'yyyy-MM-dd');
    return appointments.filter(apt => apt.date === today);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        {/* Calendar */}
        <Card className="bg-gradient-card shadow-soft border-0">
          <CardHeader>
            <CardTitle className="text-foreground">Seleccionar Fecha</CardTitle>
            <CardDescription>Elige la fecha para tu cita médica</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && setSelectedDate(date)}
              disabled={(date) => {
                const dayKey = getDayKey(date);
                return date < new Date() || !weekDays.includes(dayKey);
              }}
              locale={es}
              className="rounded-md border bg-background pointer-events-auto"
            />
          </CardContent>
        </Card>

        {/* Available Time Slots */}
        <Card className="bg-gradient-card shadow-soft border-0">
          <CardHeader>
            <CardTitle className="text-foreground">
              Horarios Disponibles - {format(selectedDate, 'EEEE, dd MMMM yyyy', { locale: es })}
            </CardTitle>
            <CardDescription>Selecciona un doctor y horario</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {mockDoctors.map(doctor => {
              const availableSlots = getAvailableTimeSlots(doctor, selectedDate);
              const hasAvailableSlots = availableSlots.some(slot => slot.available);
              
              if (!hasAvailableSlots) return null;

              return (
                <div key={doctor.id} className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <User className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">{doctor.name}</h4>
                      <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
                    {availableSlots.map(slot => (
                      <Dialog key={slot.time} open={isDialogOpen && selectedTime === slot.time && selectedDoctor?.id === doctor.id} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                          <Button
                            variant={slot.available ? "outline" : "secondary"}
                            size="sm"
                            className={`h-10 ${slot.available ? 'hover:bg-primary hover:text-primary-foreground' : 'opacity-50 cursor-not-allowed'}`}
                            disabled={!slot.available}
                            onClick={() => slot.available && handleTimeSlotClick(doctor, slot.time)}
                          >
                            <Clock className="w-3 h-3 mr-1" />
                            {slot.time}
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                          <DialogHeader>
                            <DialogTitle>Reservar Cita</DialogTitle>
                            <DialogDescription>
                              {doctor.name} - {doctor.specialty}
                              <br />
                              {format(selectedDate, 'EEEE, dd MMMM yyyy', { locale: es })} a las {slot.time}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="patient-name">Nombre del Paciente</Label>
                              <Input
                                id="patient-name"
                                placeholder="Ingresa tu nombre completo"
                                value={patientName}
                                onChange={(e) => setPatientName(e.target.value)}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="patient-phone">Teléfono</Label>
                              <Input
                                id="patient-phone"
                                placeholder="Ingresa tu número de teléfono"
                                value={patientPhone}
                                onChange={(e) => setPatientPhone(e.target.value)}
                              />
                            </div>
                            <Button onClick={handleBookAppointment} className="w-full bg-gradient-primary">
                              Confirmar Cita
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    ))}
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>

      {/* Appointments Sidebar */}
      <div className="space-y-6">
        <Card className="bg-gradient-card shadow-soft border-0">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <CalendarIcon className="w-5 h-5" />
              Citas de Hoy
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {getTodayAppointments().length === 0 ? (
              <p className="text-muted-foreground text-sm">No hay citas para hoy</p>
            ) : (
              getTodayAppointments().map(appointment => (
                <div key={appointment.id} className="bg-background rounded-lg border p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-foreground text-sm">{appointment.patientName}</p>
                    <Badge variant="outline" className="text-xs">
                      {appointment.time}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{appointment.doctorName}</p>
                  <Badge variant="secondary" className="text-xs">
                    {appointment.specialty}
                  </Badge>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-soft border-0">
          <CardHeader>
            <CardTitle className="text-foreground">Mis Próximas Citas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {appointments.filter(apt => apt.date >= format(new Date(), 'yyyy-MM-dd')).length === 0 ? (
              <p className="text-muted-foreground text-sm">No tienes citas programadas</p>
            ) : (
              appointments
                .filter(apt => apt.date >= format(new Date(), 'yyyy-MM-dd'))
                .slice(0, 5)
                .map(appointment => (
                  <div key={appointment.id} className="bg-background rounded-lg border p-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-foreground text-sm">{appointment.patientName}</p>
                      <Badge variant="outline" className="text-xs">
                        {format(new Date(appointment.date), 'dd/MM')}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{appointment.doctorName}</p>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="text-xs">
                        {appointment.specialty}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{appointment.time}</span>
                    </div>
                  </div>
                ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}