// src/components/SupportSection.tsx
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Card } from "./ui/card";
import { Mail, CheckCircle, AlertCircle } from "lucide-react";

export function SupportSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('https://pichangon.onrender.com/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus('success');
        setFormData({ name: "", email: "", subject: "", message: "" });
        
        setTimeout(() => {
          setSubmitStatus('idle');
        }, 5000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error enviando mensaje:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A5A3E] via-[#0F2919] via-60% to-[#051108] py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">

          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pichangon-accent/20 border border-pichangon-accent/30 mb-6">
              <span className="text-pichangon-accent text-sm font-medium">Estamos aquí para ti</span>
            </div>
            <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Soporte y Contacto
            </h1>
            <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto">
              ¿Tienes alguna pregunta? Nuestro equipo está listo para ayudarte
            </p>
          </div>

          {/* Email Card */}
          <div className="flex justify-center mb-12">
            <Card className="card-dark p-8 text-center max-w-md w-full hover-lift">
              <div className="w-16 h-16 rounded-full bg-pichangon-accent/20 flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-pichangon-accent" />
              </div>
              <h4 className="text-white text-xl font-semibold mb-3">Contáctanos Directamente</h4>
              <p className="text-white/70 mb-4">Envíanos tus consultas a:</p>
              <a 
                href="mailto:contacto@pichangon.com" 
                className="text-pichangon-accent hover:text-pichangon-accent/80 transition-colors text-lg font-semibold"
              >
                contacto@pichangon.com
              </a>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="card-dark p-6 md:p-8">
            <h3 className="text-white text-2xl font-bold mb-6">Envíanos un Mensaje</h3>
            
            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-pichangon-accent/20 border border-pichangon-accent/30 rounded-lg flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-pichangon-accent" />
                <p className="text-white">¡Mensaje enviado exitosamente! Te responderemos pronto.</p>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-300" />
                <p className="text-red-100">Error al enviar el mensaje. Por favor, intenta de nuevo.</p>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white font-medium">Nombre Completo</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-pichangon-accent focus:ring-pichangon-accent"
                    placeholder="Tu nombre"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white font-medium">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-pichangon-accent focus:ring-pichangon-accent"
                    placeholder="tu@email.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject" className="text-white font-medium">Asunto</Label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-pichangon-accent focus:ring-pichangon-accent"
                  placeholder="¿En qué podemos ayudarte?"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-white font-medium">Mensaje</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  rows={6}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/40 resize-none focus:border-pichangon-accent focus:ring-pichangon-accent"
                  placeholder="Cuéntanos más sobre tu consulta..."
                />
              </div>

              <Button 
                type="submit"
                size="lg"
                className="w-full bg-pichangon-accent hover:bg-pichangon-accent/90 text-white font-semibold"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Mail className="w-5 h-5 mr-2 animate-pulse" />
                    Enviando...
                  </>
                ) : submitStatus === 'success' ? (
                  <>
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Mensaje Enviado
                  </>
                ) : (
                  <>
                    <Mail className="w-5 h-5 mr-2" />
                    Enviar Mensaje
                  </>
                )}
              </Button>
            </form>
          </Card>

          {/* FAQ Section */}
          <div className="mt-16">
            <div className="text-center mb-8">
              <p className="text-pichangon-accent text-sm font-semibold mb-2 uppercase tracking-wider">
                Ayuda rápida
              </p>
              <h3 className="text-white text-3xl md:text-4xl font-bold">Preguntas Frecuentes</h3>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="card-dark p-6 hover-lift">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-2 h-2 rounded-full bg-pichangon-accent mt-2"></div>
                  <div className="flex-1">
                    <h4 className="text-white font-semibold text-lg mb-2">¿Cómo descargo la app?</h4>
                    <p className="text-white/70 leading-relaxed">
                      Puedes descargar PICHANGON desde la App Store (iOS) o Google Play Store (Android). 
                      Búscanos como "Pichangon" o usa los enlaces de descarga en nuestra página principal.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="card-dark p-6 hover-lift">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-2 h-2 rounded-full bg-pichangon-accent mt-2"></div>
                  <div className="flex-1">
                    <h4 className="text-white font-semibold text-lg mb-2">¿Es gratis usar la app?</h4>
                    <p className="text-white/70 leading-relaxed">
                      Sí, PICHANGON es completamente gratis para descargar y usar. 
                      Solo pagas por las pichangas en las que decides participar.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="card-dark p-6 hover-lift">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-2 h-2 rounded-full bg-pichangon-accent mt-2"></div>
                  <div className="flex-1">
                    <h4 className="text-white font-semibold text-lg mb-2">¿Cómo organizo una pichanga?</h4>
                    <p className="text-white/70 leading-relaxed">
                      Desde la app puedes crear tu propia pichanga, seleccionar la cancha, 
                      horario y gestionar los pagos de forma automática.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="card-dark p-6 hover-lift">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-2 h-2 rounded-full bg-pichangon-accent mt-2"></div>
                  <div className="flex-1">
                    <h4 className="text-white font-semibold text-lg mb-2">¿En qué ciudades está disponible?</h4>
                    <p className="text-white/70 leading-relaxed">
                      Actualmente PICHANGON está disponible en todo el Perú.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Footer spacer */}
          <div className="mt-16"></div>
        </div>
      </div>
    </div>
  );
}