export function PrivacyPolicy() {
  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Política de Privacidad
          </h1>
          <p className="text-white/60">
            Última actualización: 27 de noviembre de 2025
          </p>
        </div>

        {/* Intro */}
        <div className="bg-pichangon-dark-card rounded-2xl p-8 mb-8 border border-white/10">
          <p className="text-white/80 leading-relaxed mb-4">
            En <span className="text-pichangon-accent font-semibold">PICHANGON</span>, respetamos tu privacidad 
            y estamos comprometidos a proteger tus datos personales. Esta Política de Privacidad explica qué 
            información recopilamos, cómo la usamos y tus derechos sobre tus datos personales.
          </p>
          <p className="text-white/80 leading-relaxed">
            Al usar nuestra aplicación, aceptas las prácticas descritas en esta política.
          </p>
        </div>

        {/* 1. Datos Recopilados */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            1. Datos Recopilados
          </h2>
          <div className="bg-pichangon-dark-card rounded-xl p-6 border border-white/10">
            <p className="text-white/80 leading-relaxed mb-4">
              Recopilamos la siguiente información cuando usas PICHANGON:
            </p>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-pichangon-accent font-semibold mb-2">• Información de Registro</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Nombre completo y dirección de correo electrónico para crear y gestionar tu cuenta.
                </p>
              </div>

              <div>
                <h3 className="text-pichangon-accent font-semibold mb-2">• Identificadores</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  ID de usuario único y datos del dispositivo (modelo, sistema operativo, versión de la app).
                </p>
              </div>

              <div>
                <h3 className="text-pichangon-accent font-semibold mb-2">• Datos de Ubicación Ingresados Manualmente</h3>
                <p className="text-white/70 text-sm leading-relaxed mb-2">
                  PICHANGON <span className="text-pichangon-accent font-semibold">NO accede al GPS de tu dispositivo</span> ni 
                  recopila tu ubicación geográfica automáticamente. Solo almacenamos información de ubicación que tú ingresas 
                  voluntariamente:
                </p>
                <ul className="space-y-2 ml-4">
                  <li className="text-white/70 text-sm flex items-start gap-2">
                    <span className="text-pichangon-accent mt-1">→</span>
                    <span>El distrito que ingresas manualmente en tu perfil (opcional)</span>
                  </li>
                  <li className="text-white/70 text-sm flex items-start gap-2">
                    <span className="text-pichangon-accent mt-1">→</span>
                    <span>La dirección o ubicación de canchas que los organizadores ingresan al crear pichangas</span>
                  </li>
                </ul>
                <p className="text-white/70 text-sm mt-2 leading-relaxed">
                  Esta información se utiliza únicamente para mostrar información básica en perfiles y en los detalles 
                  de las pichangas. No realizamos geolocalización, seguimiento de ubicación ni sugerencias basadas en 
                  tu ubicación actual.
                </p>
              </div>

              <div>
                <h3 className="text-pichangon-accent font-semibold mb-2">• Fotos y Contenido</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Imágenes de perfil y comprobantes de pago que subas voluntariamente.
                </p>
              </div>

              <div>
                <h3 className="text-pichangon-accent font-semibold mb-2">• Contenido Generado por el Usuario</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Recopilamos y almacenamos mensajes de chat en grupos, comentarios, evaluaciones de jugadores y 
                  cualquier otro contenido que publiques en la plataforma. Nos reservamos el derecho de moderar y 
                  eliminar contenido que viole nuestros Términos de Servicio, incluyendo pero no limitado a lenguaje 
                  ofensivo, acoso, spam o contenido inapropiado.
                </p>
              </div>

              <div>
                <h3 className="text-pichangon-accent font-semibold mb-2">• Información de Pagos (Procesamiento Externo)</h3>
                <p className="text-white/70 text-sm leading-relaxed mb-2">
                  PICHANGON <span className="text-pichangon-accent font-semibold">NO procesa pagos directamente</span>. 
                  Los pagos entre usuarios y organizadores se realizan externamente mediante métodos como Yape, Plin 
                  o transferencias bancarias.
                </p>
                <p className="text-white/70 text-sm leading-relaxed">
                  Los organizadores configuran sus propios métodos de cobro en la app, y los participantes suben 
                  comprobantes de pago como evidencia. Solo almacenamos las imágenes de los comprobantes que los 
                  usuarios suben voluntariamente y el estado de pago marcado por el organizador (pagado/no pagado). 
                  No almacenamos información financiera sensible como números de tarjeta o cuentas bancarias.
                </p>
              </div>

              <div>
                <h3 className="text-pichangon-accent font-semibold mb-2">• Datos de Uso</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Información sobre cómo interactúas con la app (partidos vistos, grupos unidos, funciones utilizadas).
                </p>
              </div>

              <div>
                <h3 className="text-pichangon-accent font-semibold mb-2">• Datos de Diagnóstico</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Información técnica sobre errores, rendimiento y uso de funciones para mejorar la app.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Finalidad del Uso de Datos */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            2. Finalidad del Uso de Datos
          </h2>
          <div className="bg-pichangon-dark-card rounded-xl p-6 border border-white/10">
            <p className="text-white/80 leading-relaxed mb-4">
              Utilizamos tus datos personales para los siguientes propósitos:
            </p>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-pichangon-accent font-semibold mb-2">• Funcionalidad de la App</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Gestionar tu cuenta, organizar partidos, enviar notificaciones sobre eventos y permitir la 
                  comunicación entre jugadores.
                </p>
              </div>

              <div>
                <h3 className="text-pichangon-accent font-semibold mb-2">• Información de Ubicación</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Mostramos el distrito que ingresas en tu perfil y las direcciones de canchas que los organizadores 
                  proporcionan al crear pichangas. Esta información es puramente descriptiva y no se utiliza para 
                  geolocalización, seguimiento o recomendaciones basadas en ubicación. Nunca compartimos tu distrito 
                  con otros usuarios sin tu consentimiento explícito.
                </p>
              </div>

              <div>
                <h3 className="text-pichangon-accent font-semibold mb-2">• Gestión de Comprobantes de Pago</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Almacenamos las imágenes de comprobantes de pago que subes voluntariamente como evidencia de pago 
                  externo realizado (Yape, Plin, transferencias). Los organizadores pueden marcar manualmente el 
                  estado de pago de cada participante. No procesamos transacciones ni almacenamos información 
                  financiera sensible.
                </p>
              </div>

              <div>
                <h3 className="text-pichangon-accent font-semibold mb-2">• Moderación de Contenido</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Revisamos el contenido generado por usuarios (mensajes de chat, comentarios, evaluaciones) para 
                  garantizar un ambiente seguro y respetuoso. Utilizamos sistemas automatizados y revisión manual para 
                  detectar y eliminar contenido inapropiado, spam o que viole nuestros Términos de Servicio.
                </p>
              </div>

              <div>
                <h3 className="text-pichangon-accent font-semibold mb-2">• Mejora del Servicio</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Analizar el uso de la app, corregir errores, mejorar el rendimiento y desarrollar nuevas funciones 
                  basadas en las preferencias y patrones de uso.
                </p>
              </div>

              <div>
                <h3 className="text-pichangon-accent font-semibold mb-2">• Seguridad y Prevención de Fraude</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Proteger la integridad de la plataforma, prevenir actividades fraudulentas y garantizar el 
                  cumplimiento de nuestras políticas comunitarias.
                </p>
              </div>

              <div>
                <h3 className="text-pichangon-accent font-semibold mb-2">• Comunicación</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Enviarte notificaciones importantes sobre tu cuenta, actualizaciones de partidos, recordatorios y 
                  comunicaciones relacionadas con el servicio.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Compartir con Terceros */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            3. Compartir con Terceros
          </h2>
          <div className="bg-pichangon-dark-card rounded-xl p-6 border border-white/10">
            <p className="text-white/80 leading-relaxed mb-4">
              No vendemos ni compartimos tus datos personales con terceros, excepto en los siguientes casos:
            </p>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-pichangon-accent font-semibold mb-2">• Proveedores de Servicios</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Utilizamos servicios de terceros como Firebase (Google) para autenticación, almacenamiento en la 
                  nube y notificaciones push. Google Analytics se usa para analizar el uso de la app.
                </p>
              </div>

              <div>
                <h3 className="text-pichangon-accent font-semibold mb-2">• Cloudinary</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Almacenamos imágenes de perfil y comprobantes de pago en servidores de Cloudinary.
                </p>
              </div>

              <div>
                <h3 className="text-pichangon-accent font-semibold mb-2">• Requisitos Legales</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Podemos divulgar información si es requerido por ley o para proteger nuestros derechos legales.
                </p>
              </div>
            </div>

            <p className="text-white/70 text-sm mt-4 leading-relaxed">
              Todos nuestros proveedores están obligados contractualmente a proteger tus datos y solo pueden usarlos 
              para los fines especificados.
            </p>
          </div>
        </section>

        {/* 4. Retención de Datos */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            4. Retención de Datos
          </h2>
          <div className="bg-pichangon-dark-card rounded-xl p-6 border border-white/10">
            <p className="text-white/80 leading-relaxed mb-4">
              Conservamos tus datos personales mientras tu cuenta esté activa y por el tiempo necesario para cumplir 
              con las finalidades descritas en esta política.
            </p>
            
            <div className="space-y-3">
              <div>
                <h3 className="text-pichangon-accent font-semibold mb-2">• Cuenta Activa</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Mientras uses la app, mantendremos tus datos para proporcionarte el servicio.
                </p>
              </div>

              <div>
                <h3 className="text-pichangon-accent font-semibold mb-2">• Después de Eliminar tu Cuenta</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Eliminaremos tus datos personales dentro de 30 días, excepto información que debamos conservar por 
                  razones legales o de seguridad.
                </p>
              </div>

              <div>
                <h3 className="text-pichangon-accent font-semibold mb-2">• Datos Anonimizados</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Podemos conservar datos agregados y anonimizados para análisis estadístico indefinidamente.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Derechos del Usuario */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            5. Derechos del Usuario
          </h2>
          <div className="bg-pichangon-dark-card rounded-xl p-6 border border-white/10">
            <p className="text-white/80 leading-relaxed mb-4">
              Tienes los siguientes derechos sobre tus datos personales:
            </p>
            
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <span className="text-pichangon-accent mt-1">✓</span>
                <div>
                  <h3 className="text-white font-semibold mb-1">Acceso</h3>
                  <p className="text-white/70 text-sm leading-relaxed">
                    Puedes solicitar una copia de todos los datos personales que tenemos sobre ti.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <span className="text-pichangon-accent mt-1">✓</span>
                <div>
                  <h3 className="text-white font-semibold mb-1">Corrección</h3>
                  <p className="text-white/70 text-sm leading-relaxed">
                    Puedes actualizar o corregir tu información personal desde la configuración de tu perfil en la app.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <span className="text-pichangon-accent mt-1">✓</span>
                <div>
                  <h3 className="text-white font-semibold mb-1">Eliminación</h3>
                  <p className="text-white/70 text-sm leading-relaxed">
                    Puedes solicitar la eliminación completa de tu cuenta y datos personales desde la app o 
                    contactándonos directamente.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <span className="text-pichangon-accent mt-1">✓</span>
                <div>
                  <h3 className="text-white font-semibold mb-1">Portabilidad</h3>
                  <p className="text-white/70 text-sm leading-relaxed">
                    Puedes solicitar tus datos en un formato estructurado y de uso común.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <span className="text-pichangon-accent mt-1">✓</span>
                <div>
                  <h3 className="text-white font-semibold mb-1">Oposición</h3>
                  <p className="text-white/70 text-sm leading-relaxed">
                    Puedes oponerte al procesamiento de tus datos para ciertos fines, como marketing directo.
                  </p>
                </div>
              </div>
            </div>

            <p className="text-white/70 text-sm mt-4 leading-relaxed">
              Para ejercer cualquiera de estos derechos, contáctanos en el correo indicado más abajo.
            </p>
          </div>
        </section>

        {/* 6. Seguridad */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            6. Seguridad de los Datos
          </h2>
          <div className="bg-pichangon-dark-card rounded-xl p-6 border border-white/10">
            <p className="text-white/80 leading-relaxed">
              Implementamos medidas de seguridad técnicas y organizativas apropiadas para proteger tus datos personales 
              contra acceso no autorizado, pérdida, destrucción o alteración. Sin embargo, ningún sistema de transmisión 
              por Internet es 100% seguro, por lo que no podemos garantizar la seguridad absoluta de la información 
              transmitida a través de nuestra app.
            </p>
          </div>
        </section>

        {/* 7. Menores de Edad */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            7. Menores de Edad
          </h2>
          <div className="bg-pichangon-dark-card rounded-xl p-6 border border-white/10">
            <p className="text-white/80 leading-relaxed mb-4">
              PICHANGON está dirigida a usuarios mayores de 13 años. No recopilamos intencionalmente información 
              personal de menores de 13 años.
            </p>
            <p className="text-white/70 text-sm leading-relaxed">
              Si descubrimos que hemos recopilado datos de un menor de 13 años, eliminaremos esa información 
              inmediatamente.
            </p>
          </div>
        </section>

        {/* 8. Cambios a esta Política */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            8. Cambios a esta Política
          </h2>
          <div className="bg-pichangon-dark-card rounded-xl p-6 border border-white/10">
            <p className="text-white/80 leading-relaxed mb-4">
              Podemos actualizar esta Política de Privacidad ocasionalmente. Te notificaremos de cualquier cambio 
              importante publicando la nueva política en la app y actualizando la fecha de "Última actualización" 
              al inicio de este documento.
            </p>
            <p className="text-white/70 text-sm leading-relaxed">
              Te recomendamos revisar esta política periódicamente.
            </p>
          </div>
        </section>

        {/* 9. Información de Contacto */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            9. Información de Contacto
          </h2>
          <div className="bg-pichangon-dark-card rounded-xl p-6 border border-white/10">
            <p className="text-white/80 leading-relaxed mb-4">
              Si tienes preguntas, inquietudes o solicitudes relacionadas con esta Política de Privacidad o el 
              manejo de tus datos personales, contáctanos:
            </p>
            
            <div className="space-y-3">
              <div>
                <p className="text-white/60 text-sm mb-1">Email de Privacidad:</p>
                <a 
                  href="mailto:privacy@pichangon.com" 
                  className="text-pichangon-accent hover:text-pichangon-accent/80 font-semibold"
                >
                  privacy@pichangon.com
                </a>
              </div>

              <div>
                <p className="text-white/60 text-sm mb-1">Contacto General:</p>
                <a 
                  href="mailto:contacto@pichangon.com" 
                  className="text-pichangon-accent hover:text-pichangon-accent/80 font-semibold"
                >
                  contacto@pichangon.com
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <div className="text-center pt-8 border-t border-white/10">
          <p className="text-white/60 text-sm">
            © 2025 PICHANGON. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </div>
  );
}