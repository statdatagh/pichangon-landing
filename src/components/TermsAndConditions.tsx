export function TermsAndConditions() {
  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Términos y Condiciones de Uso
          </h1>
          <p className="text-white/60">
            Última actualización: 27 de noviembre de 2025
          </p>
        </div>

        {/* Intro */}
        <div className="bg-pichangon-dark-card rounded-2xl p-8 mb-8 border border-white/10">
          <p className="text-white/80 leading-relaxed mb-4">
            Bienvenido a <span className="text-pichangon-accent font-semibold">PICHANGON</span> ("la App"). 
            Estos Términos y Condiciones regulan el acceso y uso de la aplicación móvil PICHANGON, 
            así como los servicios relacionados ofrecidos por nosotros.
          </p>
          <p className="text-white/80 leading-relaxed">
            Al acceder y utilizar la App, el usuario declara haber leído, comprendido y aceptado estos Términos. 
            Si no está de acuerdo, deberá abstenerse de usar la App.
          </p>
        </div>

        {/* 1. Titular del Servicio */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            1. Titular del Servicio (Operación Provisional)
          </h2>
          <div className="bg-pichangon-dark-card rounded-xl p-6 border border-white/10">
            <p className="text-white/80 leading-relaxed mb-4">
              PICHANGON es actualmente operada por <span className="text-pichangon-accent font-semibold">PICHANGON TECH</span>, 
              entidad provisional responsable del desarrollo, operación y mantenimiento de la App, 
              mientras la empresa formal se encuentra en proceso de constitución en la República del Perú.
            </p>
            <p className="text-white/80 leading-relaxed">
              Una vez que la sociedad esté debidamente inscrita, sus datos legales serán actualizados 
              en estos Términos sin afectar su validez.
            </p>
          </div>
        </section>

        {/* 2. Descripción del Servicio */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            2. Descripción del Servicio
          </h2>
          <div className="bg-pichangon-dark-card rounded-xl p-6 border border-white/10">
            <p className="text-white/80 leading-relaxed mb-4">
              PICHANGON es una plataforma digital que conecta jugadores de fútbol amateur para facilitar 
              la organización y participación en partidos ("pichangas").
            </p>
            <p className="text-white/80 leading-relaxed mb-4">
              La App actúa únicamente como <span className="text-pichangon-accent font-semibold">intermediario tecnológico</span>, 
              permitiendo a los usuarios:
            </p>
            <ul className="space-y-2 mb-4">
              <li className="text-white/80 flex items-start gap-2">
                <span className="text-pichangon-accent mt-1">•</span>
                <span>Publicar pichangas</span>
              </li>
              <li className="text-white/80 flex items-start gap-2">
                <span className="text-pichangon-accent mt-1">•</span>
                <span>Unirse a pichangas creadas por otros usuarios</span>
              </li>
              <li className="text-white/80 flex items-start gap-2">
                <span className="text-pichangon-accent mt-1">•</span>
                <span>Gestionar listas de participantes</span>
              </li>
              <li className="text-white/80 flex items-start gap-2">
                <span className="text-pichangon-accent mt-1">•</span>
                <span>Realizar coordinación básica entre jugadores</span>
              </li>
              <li className="text-white/80 flex items-start gap-2">
                <span className="text-pichangon-accent mt-1">•</span>
                <span>Calificar a otros usuarios después de cada pichanga</span>
              </li>
              <li className="text-white/80 flex items-start gap-2">
                <span className="text-pichangon-accent mt-1">•</span>
                <span>Buscar disponibilidad de canchas en plataformas externas mediante integración tecnológica</span>
              </li>
            </ul>
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
              <p className="text-white/80 leading-relaxed mb-2">
                <span className="text-yellow-500 font-semibold">⚠️ Importante:</span>
              </p>
              <ul className="space-y-2">
                <li className="text-white/70 flex items-start gap-2 text-sm">
                  <span className="text-yellow-500 mt-1">•</span>
                  <span>Actualmente, PICHANGON no gestiona reservas de canchas</span>
                </li>
                <li className="text-white/70 flex items-start gap-2 text-sm">
                  <span className="text-yellow-500 mt-1">•</span>
                  <span>No administra instalaciones deportivas</span>
                </li>
                <li className="text-white/70 flex items-start gap-2 text-sm">
                  <span className="text-yellow-500 mt-1">•</span>
                  <span>No garantiza disponibilidad de espacios</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* 3. Registro y Obligaciones */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            3. Registro y Obligaciones del Usuario
          </h2>
          <div className="bg-pichangon-dark-card rounded-xl p-6 border border-white/10">
            <p className="text-white/80 leading-relaxed mb-4">
              Para utilizar la App, el usuario debe:
            </p>
            <ul className="space-y-3 mb-4">
              <li className="text-white/80 flex items-start gap-2">
                <span className="text-pichangon-accent mt-1">✓</span>
                <span>Proporcionar información verdadera, actual y completa</span>
              </li>
              <li className="text-white/80 flex items-start gap-2">
                <span className="text-pichangon-accent mt-1">✓</span>
                <span>Mantener la confidencialidad de sus credenciales de acceso</span>
              </li>
              <li className="text-white/80 flex items-start gap-2">
                <span className="text-pichangon-accent mt-1">✓</span>
                <span>Utilizar la App de forma responsable y respetuosa</span>
              </li>
              <li className="text-white/80 flex items-start gap-2">
                <span className="text-pichangon-accent mt-1">✓</span>
                <span>Evitar conductas fraudulentas, abusivas o que perjudiquen a otros usuarios</span>
              </li>
            </ul>
            <p className="text-white/70 text-sm">
              PICHANGON podrá suspender o cancelar cuentas que infrinjan estos Términos.
            </p>
          </div>
        </section>

        {/* 4. Pagos Entre Usuarios */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            4. Pagos Entre Usuarios
          </h2>
          <div className="bg-pichangon-dark-card rounded-xl p-6 border border-white/10">
            <p className="text-white/80 leading-relaxed mb-4">
              <span className="text-pichangon-accent font-semibold">PICHANGON actualmente no procesa pagos dentro de la App.</span>
            </p>
            <p className="text-white/80 leading-relaxed mb-4">
              Los pagos por participación en pichangas son realizados por los usuarios a los organizadores 
              por medios externos (transferencias, yape, plin, etc.).
            </p>
            <p className="text-white/80 leading-relaxed mb-4">
              La App solo permite que el organizador confirme manualmente si un usuario pagó o no.
            </p>
            <p className="text-white/70 text-sm">
              Una vez que se registra un pago, la opción de cancelar la participación se bloquea para evitar abusos.
            </p>
          </div>
        </section>

        {/* 5. Reembolsos */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            5. Reembolsos
          </h2>
          <div className="bg-pichangon-dark-card rounded-xl p-6 border border-white/10">
            <p className="text-white/80 leading-relaxed mb-4">
              Dado que PICHANGON no procesa pagos, actualmente no administra reembolsos.
            </p>
            <p className="text-white/80 leading-relaxed mb-4">
              Cualquier devolución corresponde únicamente al organizador de la pichanga y deberá 
              coordinarse directamente entre las partes.
            </p>
            <p className="text-white/70 text-sm">
              En caso futuro de habilitarse un sistema formal de reembolsos, estos Términos serán actualizados.
            </p>
          </div>
        </section>

        {/* 6. Sistema de Calificaciones */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            6. Sistema de Calificaciones
          </h2>
          <div className="bg-pichangon-dark-card rounded-xl p-6 border border-white/10">
            <p className="text-white/80 leading-relaxed mb-4">
              Después de cada pichanga, los usuarios pueden calificarse mutuamente (de 1 a 5 estrellas) 
              y dejar comentarios.
            </p>
            <p className="text-white/80 leading-relaxed mb-4">
              Este sistema busca:
            </p>
            <ul className="space-y-2 mb-4">
              <li className="text-white/80 flex items-start gap-2">
                <span className="text-pichangon-accent mt-1">•</span>
                <span>Promover buen comportamiento</span>
              </li>
              <li className="text-white/80 flex items-start gap-2">
                <span className="text-pichangon-accent mt-1">•</span>
                <span>Advertir a la comunidad sobre usuarios problemáticos</span>
              </li>
              <li className="text-white/80 flex items-start gap-2">
                <span className="text-pichangon-accent mt-1">•</span>
                <span>Mantener una reputación visible para todos</span>
              </li>
            </ul>
            <p className="text-white/70 text-sm">
              PICHANGON podrá tomar medidas (advertencias, suspensiones o bloqueos) basadas en 
              historial de calificaciones negativas o reportes de mala conducta.
            </p>
          </div>
        </section>

        {/* 7. Información de Ubicación */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            7. Información de Ubicación (Geolocalización)
          </h2>
          <div className="bg-pichangon-dark-card rounded-xl p-6 border border-white/10">

            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-4">
              <p className="text-white/80 leading-relaxed">
                <span className="text-blue-400 font-semibold">ℹ️ Uso de geolocalización:</span>
              </p>
            </div>

            <p className="text-white/80 leading-relaxed mb-4">
              PICHANGON puede acceder a la ubicación del usuario mediante el uso de 
              <span className="text-pichangon-accent font-semibold"> tecnología GPS del dispositivo</span>, 
              siempre que el usuario otorgue su consentimiento previo y explícito.
            </p>

            <p className="text-white/80 leading-relaxed mb-4">
              La información de ubicación se utiliza exclusivamente para:
            </p>

            <ul className="space-y-2 mb-4">
              <li className="text-white/80 flex items-start gap-2">
                <span className="text-pichangon-accent mt-1">•</span>
                <span>Mostrar canchas disponibles cercanas al usuario</span>
              </li>
              <li className="text-white/80 flex items-start gap-2">
                <span className="text-pichangon-accent mt-1">•</span>
                <span>Calcular distancias aproximadas entre el usuario y las canchas</span>
              </li>
              <li className="text-white/80 flex items-start gap-2">
                <span className="text-pichangon-accent mt-1">•</span>
                <span>Optimizar los resultados de búsqueda mediante algoritmos de proximidad</span>
              </li>
              <li className="text-white/80 flex items-start gap-2">
                <span className="text-pichangon-accent mt-1">•</span>
                <span>Mejorar la experiencia del usuario en la búsqueda de reservas externas</span>
              </li>
            </ul>

            <p className="text-white/80 leading-relaxed mb-4">
              PICHANGON no almacena la ubicación exacta del usuario de forma permanente, 
              ni realiza seguimiento continuo en segundo plano.
            </p>

            <p className="text-white/80 leading-relaxed mb-4">
              La ubicación no se comparte con otros usuarios de la plataforma ni con terceros, 
              salvo cuando sea estrictamente necesario para el funcionamiento del servicio 
              o requerido por ley.
            </p>

            <p className="text-white/80 leading-relaxed mb-4">
              El usuario puede revocar el acceso a su ubicación en cualquier momento desde la 
              configuración de su dispositivo, lo cual puede limitar ciertas funcionalidades 
              de la App.
            </p>

            <p className="text-white/70 text-sm">
              Para más información sobre el tratamiento de datos personales, consulte nuestra Política de Privacidad.
            </p>
          </div>
        </section>

        {/* 8. Contenido Generado */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            8. Contenido Generado por los Usuarios
          </h2>
          <div className="bg-pichangon-dark-card rounded-xl p-6 border border-white/10">
            <p className="text-white/80 leading-relaxed mb-4">
              Todo contenido publicado por los usuarios (pichangas, mensajes, comentarios, calificaciones, etc.) 
              es responsabilidad exclusiva del usuario que lo emite.
            </p>
            <p className="text-white/80 leading-relaxed mb-4">
              El usuario declara que:
            </p>
            <ul className="space-y-2 mb-4">
              <li className="text-white/80 flex items-start gap-2">
                <span className="text-pichangon-accent mt-1">•</span>
                <span>Tiene el derecho de publicar dicho contenido</span>
              </li>
              <li className="text-white/80 flex items-start gap-2">
                <span className="text-pichangon-accent mt-1">•</span>
                <span>No publicará contenido ofensivo, ilegal, discriminatorio o engañoso</span>
              </li>
              <li className="text-white/80 flex items-start gap-2">
                <span className="text-pichangon-accent mt-1">•</span>
                <span>No usará la App para acosar, amenazar o perjudicar a terceros</span>
              </li>
            </ul>
            <p className="text-white/70 text-sm">
              PICHANGON puede moderar, ocultar o eliminar contenido que infrinja estas reglas.
            </p>
          </div>
        </section>

        {/* 9. Eliminación de Cuenta */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            9. Eliminación de Cuenta y Retención de Datos
          </h2>
          <div className="bg-pichangon-dark-card rounded-xl p-6 border border-white/10">
            <p className="text-white/80 leading-relaxed mb-4">
              El usuario puede solicitar la eliminación de su cuenta en cualquier momento. Sin embargo:
            </p>
            <p className="text-white/80 leading-relaxed mb-4">
              La eliminación no implica borrado inmediato de toda la información.
            </p>
            <p className="text-white/80 leading-relaxed mb-4">
              PICHANGON podrá retener ciertos datos por un periodo razonable para:
            </p>
            <ul className="space-y-2 mb-4">
              <li className="text-white/80 flex items-start gap-2">
                <span className="text-pichangon-accent mt-1">•</span>
                <span>Prevenir fraude</span>
              </li>
              <li className="text-white/80 flex items-start gap-2">
                <span className="text-pichangon-accent mt-1">•</span>
                <span>Investigar reportes</span>
              </li>
              <li className="text-white/80 flex items-start gap-2">
                <span className="text-pichangon-accent mt-1">•</span>
                <span>Resolver disputas</span>
              </li>
              <li className="text-white/80 flex items-start gap-2">
                <span className="text-pichangon-accent mt-1">•</span>
                <span>Cumplir obligaciones legales</span>
              </li>
              <li className="text-white/80 flex items-start gap-2">
                <span className="text-pichangon-accent mt-1">•</span>
                <span>Proteger la seguridad de la comunidad</span>
              </li>
            </ul>
            <p className="text-white/70 text-sm">
              Durante este periodo, la cuenta estará desactivada y no visible para otros usuarios.
            </p>
          </div>
        </section>

        {/* 10. Reincidencia */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            10. Reincidencia y Prohibición de Re-registro
          </h2>
          <div className="bg-pichangon-dark-card rounded-xl p-6 border border-white/10">
            <p className="text-white/80 leading-relaxed mb-4">
              PICHANGON podrá suspender, bloquear o eliminar cuentas que:
            </p>
            <ul className="space-y-2 mb-4">
              <li className="text-white/80 flex items-start gap-2">
                <span className="text-red-400 mt-1">✗</span>
                <span>Cometan fraude</span>
              </li>
              <li className="text-white/80 flex items-start gap-2">
                <span className="text-red-400 mt-1">✗</span>
                <span>Tengan calificaciones consistentemente negativas</span>
              </li>
              <li className="text-white/80 flex items-start gap-2">
                <span className="text-red-400 mt-1">✗</span>
                <span>Violen estos Términos</span>
              </li>
              <li className="text-white/80 flex items-start gap-2">
                <span className="text-red-400 mt-1">✗</span>
                <span>Perjudiquen la experiencia de otros usuarios</span>
              </li>
            </ul>
            <p className="text-white/70 text-sm">
              PICHANGON podrá impedir recrear cuentas nuevas con distinta información si detecta 
              reintentos de acceso por parte de un usuario sancionado.
            </p>
          </div>
        </section>

        {/* 11. Limitación de Responsabilidad */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            11. Limitación de Responsabilidad
          </h2>
          <div className="bg-pichangon-dark-card rounded-xl p-6 border border-white/10">
            <p className="text-white/80 leading-relaxed mb-4">
              PICHANGON no es responsable por:
            </p>
            <ul className="space-y-2 mb-4">
              <li className="text-white/80 flex items-start gap-2">
                <span className="text-yellow-400 mt-1">⚠</span>
                <span>Lesiones, daños o pérdidas ocurridas dentro o fuera de una pichanga</span>
              </li>
              <li className="text-white/80 flex items-start gap-2">
                <span className="text-yellow-400 mt-1">⚠</span>
                <span>Conflictos entre usuarios</span>
              </li>
              <li className="text-white/80 flex items-start gap-2">
                <span className="text-yellow-400 mt-1">⚠</span>
                <span>Pagos no realizados, mal realizados o disputas financieras entre usuarios</span>
              </li>
              <li className="text-white/80 flex items-start gap-2">
                <span className="text-yellow-400 mt-1">⚠</span>
                <span>Cancelaciones, ausencias o incumplimientos de los participantes u organizadores</span>
              </li>
              <li className="text-white/80 flex items-start gap-2">
                <span className="text-yellow-400 mt-1">⚠</span>
                <span>Información falsa proporcionada por los usuarios</span>
              </li>
              <li className="text-white/80 flex items-start gap-2">
                <span className="text-yellow-400 mt-1">⚠</span>
                <span>La disponibilidad, precios o condiciones de canchas ofrecidas por plataformas externas</span>
              </li>

              <li className="text-white/80 flex items-start gap-2">
                <span className="text-yellow-400 mt-1">⚠</span>
                <span>Errores, desactualizaciones o inconsistencias en la información obtenida de servicios externos</span>
              </li>

              <li className="text-white/80 flex items-start gap-2">
                <span className="text-yellow-400 mt-1">⚠</span>
                <span>El proceso de reserva realizado fuera de la App, el cual es gestionado por terceros</span>
              </li>
            </ul>
            <p className="text-pichangon-accent font-semibold">
              La App es únicamente un intermediario tecnológico.
            </p>
          </div>
        </section>

        {/* 12. Modificaciones */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            12. Modificaciones
          </h2>
          <div className="bg-pichangon-dark-card rounded-xl p-6 border border-white/10">
            <p className="text-white/80 leading-relaxed mb-4">
              PICHANGON puede modificar estos Términos en cualquier momento.
            </p>
            <p className="text-white/80 leading-relaxed mb-4">
              Cuando se realicen cambios sustanciales, se notificará a los usuarios a través de la App 
              o por medios equivalentes.
            </p>
            <p className="text-white/70 text-sm">
              El uso continuado de la App implica la aceptación de los Términos modificados.
            </p>
          </div>
        </section>

        {/* 13. Legislación */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            13. Legislación Aplicable y Jurisdicción
          </h2>
          <div className="bg-pichangon-dark-card rounded-xl p-6 border border-white/10">
            <p className="text-white/80 leading-relaxed mb-4">
              Estos Términos se rigen por las leyes de la República del Perú.
            </p>
            <p className="text-white/80 leading-relaxed">
              Cualquier controversia será resuelta ante los tribunales competentes de Lima, Perú.
            </p>
          </div>
        </section>

        {/* 14. Contacto */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            14. Contacto
          </h2>
          <div className="bg-pichangon-dark-card rounded-xl p-6 border border-white/10">
            <p className="text-white/80 leading-relaxed mb-4">
              Para consultas o solicitudes relacionadas con estos Términos:
            </p>
            <div className="flex items-center gap-2">
              <span className="text-white/60">📧</span>
              <a 
                href="mailto:contacto@pichangon.com" 
                className="text-pichangon-accent hover:text-pichangon-accent/80 font-semibold"
              >
                contacto@pichangon.com
              </a>
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