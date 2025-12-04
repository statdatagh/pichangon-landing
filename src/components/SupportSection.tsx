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
      // ✅ URL DIRECTA DE TU BACKEND EN RENDER
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
    <div className="min-h-screen bg-gradient-to-br from-[#2d5f3f] via-[#3a7a4f] to-[#2d5f3f] py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-white text-4xl md:text-5xl mb-4">Soporte y Contacto</h2>
            <p className="text-white/80 text-xl">
              ¿Tienes alguna pregunta? Estamos aquí para ayudarte
            </p>
          </div>

          <div className="flex justify-center mb-12">
            <Card className="bg-white/10 backdrop-blur border-white/20 p-8 text-center max-w-md w-full">
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-white text-xl mb-3">Contáctanos</h4>
              <p className="text-white/70 mb-4">Envíanos tus consultas a:</p>
              <a href="mailto:contacto@pichangon.com" className="text-white hover:text-white/80 transition-colors text-lg">
                contacto@pichangon.com
              </a>
            </Card>
          </div>

          <Card className="bg-white/10 backdrop-blur border-white/20 p-8">
            <h3 className="text-white text-2xl mb-6">Envíanos un Mensaje</h3>
            
            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-lg flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-300" />
                <p className="text-green-100">¡Mensaje enviado exitosamente! Te responderemos pronto.</p>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-300" />
                <p className="text-red-100">Error al enviar el mensaje. Por favor, intenta de nuevo.</p>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white">Nombre Completo</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/50"
                    placeholder="Tu nombre"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/50"
                    placeholder="tu@email.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject" className="text-white">Asunto</Label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/50"
                  placeholder="¿En qué podemos ayudarte?"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-white">Mensaje</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  rows={6}
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/50 resize-none"
                  placeholder="Cuéntanos más sobre tu consulta..."
                />
              </div>

              <Button 
                type="submit"
                size="lg"
                className="w-full bg-white text-[#2d5f3f] hover:bg-gray-100"
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

          <div className="mt-12">
            <h3 className="text-white text-2xl mb-6 text-center">Preguntas Frecuentes</h3>
            
            <div className="space-y-4">
              <Card className="bg-white/10 backdrop-blur border-white/20 p-6">
                <h4 className="text-white mb-2">¿Cómo descargo la app?</h4>
                <p className="text-white/80">
                  Puedes descargar PICHANGON desde la App Store (iOS) o Google Play Store (Android). Búscanos como &quot;Pichangon&quot;.
                </p>
              </Card>

              <Card className="bg-white/10 backdrop-blur border-white/20 p-6">
                <h4 className="text-white mb-2">¿Es gratis usar la app?</h4>
                <p className="text-white/80">
                  Sí, PICHANGON es completamente gratis para descargar y usar.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}