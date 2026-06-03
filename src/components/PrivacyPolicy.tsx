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
            Última actualización: 03 de junio de 2026
          </p>
        </div>

        {/* Intro */}
        <div className="bg-pichangon-dark-card rounded-2xl p-8 mb-8 border border-white/10">
          <p className="text-white/80 leading-relaxed mb-4">
            En <span className="text-pichangon-accent font-semibold">PICHANGON</span>, respetamos tu privacidad
            y estamos comprometidos a proteger tus datos personales conforme a la Ley N. 29733, Ley de
            Protección de Datos Personales, y su reglamento aprobado mediante Decreto Supremo N. 016-2024-JUS.
          </p>
          <p className="text-white/80 leading-relaxed">
            Esta Política explica qué información recopilamos, cómo la usamos y tus derechos sobre tus datos
            personales. Al usar nuestra aplicación, aceptas las prácticas descritas en esta política.
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
                <h3 className="text-pichangon-accent font-semibold mb-2">• Datos de Ubicación</h3>
                <p className="text-white/70 text-sm leading-relaxed mb-2">
                  PICHANGON puede acceder a la ubicación del dispositivo mediante tecnología GPS,
                  únicamente cuando el usuario lo autoriza explícitamente. Recopilamos:
                </p>
                <ul className="space-y-2 ml-4 mb-2">
                  {[
                    "Ubicación del dispositivo obtenida mediante GPS (latitud y longitud)",
                    "Ubicaciones ingresadas manualmente (direcciones o distritos)",
                  ].map((item) => (
                    <li key={item} className="text-white/70 text-sm flex items-start gap-2">
                      <span className="text-pichangon-accent mt-1">→</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-white/70 text-sm leading-relaxed">
                  No realizamos seguimiento continuo en segundo plano ni almacenamos la ubicación exacta
                  de forma permanente. Los datos de ubicación son eliminados de nuestros servidores en un
                  plazo máximo de 30 días desde su captura, salvo que su conservación sea necesaria para
                  resolver una disputa activa. El acceso puede ser desactivado en cualquier momento desde
                  la configuración del dispositivo.
                </p>
              </div>

              <div>
                <h3 className="text-pichangon-accent font-semibold mb-2">• Fotos e Imágenes</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Imágenes de perfil, fotos de equipos, imágenes de pichangas y logos de sponsors que
                  subas voluntariamente. Estas son procesadas y almacenadas mediante Cloudinary.
                </p>
              </div>

              <div>
                <h3 className="text-pichangon-accent font-semibold mb-2">• Comprobantes de Pago</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Imágenes o PDFs de comprobantes de pago que subas voluntariamente como evidencia de
                  transacciones externas (Yape, Plin, transferencias). Estos archivos son almacenados
                  mediante Bunny.net. No almacenamos información financiera sensible como números de
                  tarjeta o cuentas bancarias.
                </p>
              </div>

              <div>
                <h3 className="text-pichangon-accent font-semibold mb-2">• Archivos de Chat</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Imágenes, documentos, audios y videos compartidos en los chats grupales de la App.
                  Estos archivos son almacenados y distribuidos mediante Bunny.net.
                </p>
              </div>

              <div>
                <h3 className="text-pichangon-accent font-semibold mb-2">• Contenido Generado por el Usuario</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Mensajes de chat, comentarios, evaluaciones de jugadores y cualquier otro contenido
                  que publiques en la plataforma. Nos reservamos el derecho de moderar y eliminar
                  contenido que viole nuestros Términos y Condiciones.
                </p>
              </div>

              <div>
                <h3 className="text-pichangon-accent font-semibold mb-2">• Datos de Uso</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Información sobre cómo interactúas con la app (partidos vistos, grupos unidos,
                  funciones utilizadas).
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
                  Gestionar tu cuenta, organizar partidos, enviar notificaciones sobre eventos y permitir
                  la comunicación entre jugadores.
                </p>
              </div>

              <div>
                <h3 className="text-pichangon-accent font-semibold mb-2">• Geolocalización</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Mostrar canchas cercanas, calcular distancias aproximadas y optimizar los resultados
                  de búsqueda. No compartimos tu ubicación precisa con otros usuarios ni la utilizamos
                  con fines publicitarios.
                </p>
              </div>

              <div>
                <h3 className="text-pichangon-accent font-semibold mb-2">• Gestión de Comprobantes de Pago</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Almacenamos las imágenes o PDFs de comprobantes que subes como evidencia de pagos
                  externos. Los organizadores pueden marcar manualmente el estado de pago de cada
                  participante. No procesamos transacciones ni almacenamos información financiera sensible.
                </p>
              </div>

              <div>
                <h3 className="text-pichangon-accent font-semibold mb-2">• Moderación de Contenido</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Revisamos el contenido generado por usuarios para garantizar un ambiente seguro y
                  respetuoso, detectando y eliminando contenido inapropiado o que viole nuestros Términos.
                </p>
              </div>

              <div>
                <h3 className="text-pichangon-accent font-semibold mb-2">• Mejora del Servicio</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Analizar el uso de la app, corregir errores, mejorar el rendimiento y desarrollar
                  nuevas funciones basadas en preferencias y patrones de uso.
                </p>
              </div>

              <div>
                <h3 className="text-pichangon-accent font-semibold mb-2">• Seguridad y Prevención de Fraude</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Proteger la integridad de la plataforma, prevenir actividades fraudulentas y garantizar
                  el cumplimiento de nuestras políticas comunitarias.
                </p>
              </div>

              <div>
                <h3 className="text-pichangon-accent font-semibold mb-2">• Comunicación</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Enviarte notificaciones importantes sobre tu cuenta, actualizaciones de partidos,
                  recordatorios y comunicaciones relacionadas con el servicio.
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
                <h3 className="text-pichangon-accent font-semibold mb-2">• Firebase (Google)</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Utilizamos Firebase para autenticación de usuarios, almacenamiento en la nube y envío
                  de notificaciones push (FCM).
                </p>
              </div>

              <div>
                <h3 className="text-pichangon-accent font-semibold mb-2">• Cloudinary</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Utilizamos Cloudinary para el procesamiento, transformación y almacenamiento de imágenes:
                  avatares de usuarios, imágenes de equipos y grupos, imágenes de pichangas y logos de
                  sponsors. Cloudinary puede procesar datos técnicos del archivo como dimensiones, formato
                  y metadatos para aplicar las transformaciones configuradas.
                </p>
              </div>

              <div>
                <h3 className="text-pichangon-accent font-semibold mb-2">• Bunny.net</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Utilizamos Bunny.net para el almacenamiento y distribución mediante CDN de:
                  comprobantes de pago (pichangas y torneos), archivos compartidos en chat (imágenes,
                  documentos, audios) y videos. Cuando accedes a estos archivos, datos técnicos como
                  la dirección IP o información del dispositivo pueden ser procesados por Bunny.net para
                  garantizar la correcta entrega del contenido.
                </p>
              </div>

              <div>
                <h3 className="text-pichangon-accent font-semibold mb-2">• Servicios de Mapas y Geolocalización</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Utilizamos servicios de mapas y geocodificación (como OpenStreetMap) para mostrar
                  ubicaciones y procesar direcciones. Estos servicios pueden procesar datos técnicos
                  como la dirección IP o coordenadas aproximadas para su funcionamiento.
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
              Todos nuestros proveedores están obligados contractualmente a proteger tus datos y solo
              pueden utilizarlos para los fines especificados.
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
              Conservamos tus datos personales mientras tu cuenta esté activa. Una vez solicitada la
              eliminación, aplicamos los siguientes plazos según el tipo de dato:
            </p>

            <div className="space-y-3">
              {[
                { label: "Datos de perfil e historial de actividad:", value: "hasta 60 días calendario desde la solicitud." },
                { label: "Registros de transacciones y confirmaciones de pago:", value: "hasta 5 años, en cumplimiento de obligaciones tributarias y contables aplicables." },
                { label: "Datos conservados para prevención de fraude o seguridad:", value: "hasta 12 meses desde la eliminación de la cuenta." },
                { label: "Datos necesarios para resolver disputas o reportes pendientes:", value: "hasta la resolución del caso, con un máximo de 12 meses." },
                { label: "Datos de ubicación:", value: "hasta 30 días desde su captura, salvo disputa activa." },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-2">
                  <span className="text-pichangon-accent mt-1">•</span>
                  <p className="text-white/70 text-sm leading-relaxed">
                    <span className="font-semibold text-white/80">{item.label}</span> {item.value}
                  </p>
                </div>
              ))}
            </div>

            <p className="text-white/70 text-sm mt-4 leading-relaxed">
              Vencidos estos plazos, los datos serán eliminados o anonimizados de forma irreversible.
              Durante el periodo de retención, los datos no serán utilizados para fines comerciales ni
              compartidos con terceros, salvo requerimiento legal expreso. Podemos conservar datos
              agregados y anonimizados para análisis estadístico de forma indefinida.
            </p>
          </div>
        </section>

        {/* 5. Derechos del Usuario */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            5. Derechos del Titular de Datos Personales
          </h2>
          <div className="bg-pichangon-dark-card rounded-xl p-6 border border-white/10">
            <p className="text-white/80 leading-relaxed mb-4">
              En cumplimiento de la Ley N. 29733 y el Decreto Supremo N. 016-2024-JUS, tienes los
              siguientes derechos sobre tus datos personales:
            </p>

            <div className="space-y-3">
              {[
                {
                  label: "Acceso",
                  value: "Puedes solicitar una copia de todos los datos personales que tenemos sobre ti y conocer con qué finalidad son tratados.",
                },
                {
                  label: "Rectificación",
                  value: "Puedes actualizar o corregir tu información personal desde la configuración de tu perfil en la app o contactándonos directamente.",
                },
                {
                  label: "Cancelación",
                  value: "Puedes solicitar la eliminación de tu cuenta y datos personales desde la app o contactándonos. La eliminación está sujeta a los plazos de retención indicados en la sección 4.",
                },
                {
                  label: "Oposición",
                  value: "Puedes oponerte al tratamiento de tus datos para finalidades específicas cuando exista causa legítima.",
                },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-2">
                  <span className="text-pichangon-accent mt-1">✓</span>
                  <div>
                    <h3 className="text-white font-semibold mb-1">{item.label}</h3>
                    <p className="text-white/70 text-sm leading-relaxed">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-pichangon-accent/10 border border-pichangon-accent/30 rounded-lg p-4 mt-4">
              <p className="text-white/80 text-sm leading-relaxed">
                Para ejercer cualquiera de estos derechos, envía tu solicitud a{" "}
                <a href="mailto:contacto@pichangon.com" className="text-pichangon-accent font-semibold hover:text-pichangon-accent/80">
                  contacto@pichangon.com
                </a>{" "}
                indicando: nombre completo, correo registrado en la App, derecho que deseas ejercer y
                descripción de tu solicitud. Responderemos en un plazo máximo de{" "}
                <span className="font-semibold text-white">20 días hábiles</span> desde la recepción,
                conforme a la normativa vigente.
              </p>
            </div>
          </div>
        </section>

        {/* 6. Seguridad */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            6. Seguridad de los Datos
          </h2>
          <div className="bg-pichangon-dark-card rounded-xl p-6 border border-white/10">
            <p className="text-white/80 leading-relaxed">
              Implementamos medidas de seguridad técnicas y organizativas apropiadas para proteger tus
              datos personales contra acceso no autorizado, pérdida, destrucción o alteración, conforme
              al principio de seguridad establecido en la Ley N. 29733. Sin embargo, ningún sistema de
              transmisión por Internet es 100% seguro, por lo que no podemos garantizar la seguridad
              absoluta de la información transmitida a través de nuestra app.
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
              PICHANGON está dirigida a usuarios mayores de 13 años. No recopilamos intencionalmente
              información personal de menores de 13 años.
            </p>
            <p className="text-white/70 text-sm leading-relaxed">
              Si descubrimos que hemos recopilado datos de un menor de 13 años, eliminaremos esa
              información inmediatamente.
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
              Podemos actualizar esta Política de Privacidad ocasionalmente. Cuando se realicen cambios
              sustanciales, te notificaremos con un mínimo de 10 días calendario de anticipación a través
              de la App o por correo electrónico registrado, y requeriremos tu aceptación expresa antes
              de que entren en vigor.
            </p>
            <p className="text-white/70 text-sm leading-relaxed">
              La fecha de "Última actualización" al inicio de este documento siempre reflejará la versión
              vigente. Te recomendamos revisarla periódicamente.
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
              Si tienes preguntas, inquietudes o solicitudes relacionadas con esta Política de Privacidad
              o el manejo de tus datos personales, contáctanos:
            </p>

            <div className="space-y-3">
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
            © 2026 PICHANGON. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </div>
  );
}