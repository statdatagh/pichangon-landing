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
            Última actualización: 03 de junio de 2026
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
              PICHANGON es actualmente operada por <span className="text-pichangon-accent font-semibold">PICHANGON DEL BARRIO</span>,
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
              {[
                "Publicar pichangas",
                "Unirse a pichangas creadas por otros usuarios",
                "Gestionar listas de participantes",
                "Realizar coordinación básica entre jugadores",
                "Calificar a otros usuarios después de cada pichanga",
                "Buscar disponibilidad de canchas en plataformas externas mediante integración tecnológica",
              ].map((item) => (
                <li key={item} className="text-white/80 flex items-start gap-2">
                  <span className="text-pichangon-accent mt-1">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
              <p className="text-yellow-500 font-semibold mb-2">⚠️ Importante:</p>
              <ul className="space-y-2">
                {[
                  "Actualmente, PICHANGON no gestiona reservas de canchas",
                  "No administra instalaciones deportivas",
                  "No garantiza disponibilidad de espacios",
                ].map((item) => (
                  <li key={item} className="text-white/70 flex items-start gap-2 text-sm">
                    <span className="text-yellow-500 mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
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
              {[
                "Proporcionar información verdadera, actual y completa",
                "Mantener la confidencialidad de sus credenciales de acceso",
                "Utilizar la App de forma responsable y respetuosa",
                "Evitar conductas fraudulentas, abusivas o que perjudiquen a otros usuarios",
              ].map((item) => (
                <li key={item} className="text-white/80 flex items-start gap-2">
                  <span className="text-pichangon-accent mt-1">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-white/70 text-sm">
              PICHANGON podrá suspender o cancelar cuentas que infrinjan estos Términos.
            </p>
          </div>
        </section>

        {/* 4. Pagos Entre Usuarios */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            4. Pagos entre Usuarios
          </h2>
          <div className="bg-pichangon-dark-card rounded-xl p-6 border border-white/10">
            <p className="text-white/80 leading-relaxed mb-4">
              <span className="text-pichangon-accent font-semibold">PICHANGON no procesa, intermedia ni administra pagos de ningún tipo.</span>
            </p>
            <p className="text-white/80 leading-relaxed mb-4">
              Los pagos por participación en pichangas son acuerdos exclusivos entre el usuario participante
              y el organizador, realizados por medios externos a la App (transferencias, Yape, Plin, u otros).
              PICHANGON no es parte de dicha transacción y no asume responsabilidad alguna sobre su
              realización, verificación o resultado.
            </p>
            <p className="text-white/80 leading-relaxed mb-4">
              La App únicamente provee una herramienta para que el organizador registre manualmente si un
              pago fue recibido. Una vez que el organizador confirma el pago, la opción de cancelar la
              participación se restringe como medida de protección a la organización del evento.
            </p>
            <p className="text-white/80 leading-relaxed mb-4">
              Como alternativa, la App provee una herramienta de{" "}
              <span className="text-pichangon-accent font-semibold">transferencia de cupo</span>, mediante
              la cual el usuario puede ceder su lugar a otro jugador en caso de no poder asistir. Esta
              transferencia no implica reembolso alguno y queda sujeta a la aceptación del organizador y
              a la disponibilidad del evento.
            </p>
            <p className="text-white/80 leading-relaxed mb-4">
              Esta restricción solo podrá ser levantada en los siguientes casos excepcionales, coordinados
              directamente con el organizador:
            </p>
            <ul className="space-y-2 mb-4">
              {[
                "Cancelación de la pichanga por parte del organizador.",
                "Error comprobable en el registro del pago por parte del organizador.",
              ].map((item) => (
                <li key={item} className="text-white/80 flex items-start gap-2">
                  <span className="text-pichangon-accent mt-1">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-white/70 text-sm">
              Asimismo, una pichanga con pagos confirmados no puede ser cancelada a través de la App.
              En caso de situaciones excepcionales que impidan su realización, el organizador es el único
              responsable de gestionar las compensaciones correspondientes con los participantes.
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
              PICHANGON no administra, procesa ni garantiza reembolsos de ningún tipo, dado que no
              interviene en las transacciones económicas entre usuarios.
            </p>
            <p className="text-white/80 leading-relaxed mb-4">
              El organizador de cada pichanga es el único responsable de gestionar cualquier devolución
              frente a los participantes, conforme a las condiciones que haya establecido para su evento.
            </p>
            <p className="text-white/70 text-sm">
              PICHANGON podrá, a su discreción, suspender o penalizar a organizadores con historial
              documentado de incumplimiento de devoluciones o mala gestión de pagos, como medida de
              protección a la comunidad. Esto no implica que PICHANGON asuma obligación económica alguna
              frente a los usuarios afectados.
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
            <p className="text-white/80 leading-relaxed mb-4">Este sistema busca:</p>
            <ul className="space-y-2 mb-4">
              {[
                "Promover buen comportamiento",
                "Advertir a la comunidad sobre usuarios problemáticos",
                "Mantener una reputación visible para todos",
              ].map((item) => (
                <li key={item} className="text-white/80 flex items-start gap-2">
                  <span className="text-pichangon-accent mt-1">•</span>
                  <span>{item}</span>
                </li>
              ))}
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
              <p className="text-blue-400 font-semibold">ℹ️ Uso de geolocalización:</p>
            </div>
            <p className="text-white/80 leading-relaxed mb-4">
              PICHANGON puede acceder a la ubicación del usuario mediante el uso de{" "}
              <span className="text-pichangon-accent font-semibold">tecnología GPS del dispositivo</span>,
              siempre que el usuario otorgue su consentimiento previo y explícito.
            </p>
            <p className="text-white/80 leading-relaxed mb-4">
              La información de ubicación se utiliza exclusivamente para:
            </p>
            <ul className="space-y-2 mb-4">
              {[
                "Mostrar canchas disponibles cercanas al usuario",
                "Calcular distancias aproximadas entre el usuario y las canchas",
                "Optimizar los resultados de búsqueda mediante algoritmos de proximidad",
                "Mejorar la experiencia del usuario en la búsqueda de reservas externas",
              ].map((item) => (
                <li key={item} className="text-white/80 flex items-start gap-2">
                  <span className="text-pichangon-accent mt-1">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-white/80 leading-relaxed mb-4">
              PICHANGON no almacena la ubicación exacta del usuario de forma permanente, ni realiza
              seguimiento continuo en segundo plano. Los datos de ubicación obtenidos durante el uso de
              la App son eliminados de nuestros servidores en un plazo máximo de{" "}
              <span className="text-pichangon-accent font-semibold">30 días calendario</span> desde su
              captura, salvo que su conservación sea necesaria para resolver una disputa activa.
            </p>
            <p className="text-white/80 leading-relaxed mb-4">
              La ubicación no se comparte con otros usuarios de la plataforma ni con terceros, salvo
              cuando sea estrictamente necesario para el funcionamiento del servicio o requerido por ley.
            </p>
            <p className="text-white/80 leading-relaxed mb-4">
              El usuario puede revocar el acceso a su ubicación en cualquier momento desde la
              configuración de su dispositivo, lo cual puede limitar ciertas funcionalidades de la App.
            </p>
            <p className="text-white/70 text-sm">
              El tratamiento de datos de geolocalización se realiza en cumplimiento de la Ley N.° 29733,
              Ley de Protección de Datos Personales, y su reglamento aprobado mediante Decreto Supremo
              N.° 016-2024-JUS. El usuario puede ejercer sus derechos sobre estos datos conforme a lo
              establecido en la Cláusula 14 de estos Términos.
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
            <p className="text-white/80 leading-relaxed mb-4">El usuario declara que:</p>
            <ul className="space-y-2 mb-4">
              {[
                "Tiene el derecho de publicar dicho contenido",
                "No publicará contenido ofensivo, ilegal, discriminatorio o engañoso",
                "No usará la App para acosar, amenazar o perjudicar a terceros",
              ].map((item) => (
                <li key={item} className="text-white/80 flex items-start gap-2">
                  <span className="text-pichangon-accent mt-1">•</span>
                  <span>{item}</span>
                </li>
              ))}
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
              El usuario puede solicitar la eliminación de su cuenta en cualquier momento a través de
              la configuración de la App o mediante correo a{" "}
              <span className="text-pichangon-accent font-semibold">contacto@pichangon.com</span>.
            </p>
            <p className="text-white/80 leading-relaxed mb-4">
              Una vez recibida la solicitud, la cuenta será desactivada de forma inmediata y dejará de
              ser visible para otros usuarios. La eliminación definitiva de los datos se realizará
              conforme a los siguientes plazos:
            </p>
            <ul className="space-y-3 mb-4">
              {[
                { label: "Datos de perfil e historial de actividad:", value: "hasta 60 días calendario desde la solicitud." },
                { label: "Registros de transacciones y confirmaciones de pago:", value: "hasta 5 años, en cumplimiento de obligaciones tributarias y contables aplicables." },
                { label: "Datos de uso conservados para prevención de fraude o seguridad:", value: "hasta 12 meses desde la eliminación de la cuenta." },
                { label: "Datos necesarios para resolver disputas o reportes pendientes:", value: "hasta la resolución del caso, con un máximo de 12 meses." },
              ].map((item) => (
                <li key={item.label} className="text-white/80 flex items-start gap-2">
                  <span className="text-pichangon-accent mt-1">•</span>
                  <span>
                    <span className="font-semibold">{item.label}</span> {item.value}
                  </span>
                </li>
              ))}
            </ul>
            <p className="text-white/80 leading-relaxed mb-4">
              Vencidos estos plazos, los datos serán eliminados o anonimizados de forma irreversible.
            </p>
            <p className="text-white/70 text-sm">
              Durante el periodo de retención, los datos no serán utilizados para fines comerciales ni
              compartidos con terceros, salvo requerimiento legal expreso.
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
              {[
                "Cometan fraude o suplantación de identidad",
                "Acumulen calificaciones consistentemente negativas o reportes reiterados de mala conducta",
                "Infrinjan estos Términos de forma grave o reiterada",
                "Perjudiquen la experiencia, seguridad o integridad de otros usuarios",
              ].map((item) => (
                <li key={item} className="text-white/80 flex items-start gap-2">
                  <span className="text-red-400 mt-1">✗</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-white/80 leading-relaxed mb-4">
              En casos de suspensión por conductas graves, PICHANGON podrá conservar, por un periodo
              máximo de 12 meses, ciertos datos técnicos del dispositivo o cuenta (sin asociarlos a
              información personal identificable) con el único fin de prevenir el re-registro fraudulento.
              Esta medida se aplica exclusivamente cuando exista un riesgo comprobado para la comunidad.
            </p>
            <p className="text-white/70 text-sm">
              Este tratamiento se realiza al amparo del principio de seguridad establecido en la Ley
              N.° 29733 y su reglamento (DS 016-2024-JUS), y no implica seguimiento continuo ni uso
              con fines distintos a los aquí descritos.
            </p>
          </div>
        </section>

        {/* 11. Limitación de Responsabilidad */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            11. Limitación de Responsabilidad
          </h2>
          <div className="bg-pichangon-dark-card rounded-xl p-6 border border-white/10">
            <p className="text-white/80 font-semibold mb-3">Responsabilidades de PICHANGON</p>
            <p className="text-white/80 leading-relaxed mb-4">
              Como plataforma tecnológica intermediaria, PICHANGON es responsable por:
            </p>
            <ul className="space-y-2 mb-6">
              {[
                "El correcto funcionamiento de las herramientas que provee dentro de la App",
                "La seguridad y confidencialidad de los datos personales de los usuarios conforme a la Ley N.° 29733",
                "La disponibilidad razonable del servicio, salvo casos de mantenimiento programado o fuerza mayor",
              ].map((item) => (
                <li key={item} className="text-white/80 flex items-start gap-2">
                  <span className="text-pichangon-accent mt-1">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-white/80 font-semibold mb-3">Exclusiones de responsabilidad</p>
            <p className="text-white/80 leading-relaxed mb-4">
              PICHANGON, en su calidad de intermediario tecnológico, no es responsable por:
            </p>
            <ul className="space-y-2 mb-4">
              {[
                "Lesiones, daños físicos o pérdidas materiales ocurridos durante o con motivo de una pichanga",
                "Conflictos, disputas o conductas inapropiadas entre usuarios",
                "Pagos no realizados, mal realizados o no devueltos, dado que no interviene en las transacciones económicas",
                "Cancelaciones, ausencias o incumplimientos de participantes u organizadores",
                "Información falsa, incompleta o engañosa proporcionada por los usuarios",
                "La disponibilidad, precios, condiciones o calidad de canchas ofrecidas por plataformas externas",
                "El proceso de reserva realizado fuera de la App, el cual es gestionado íntegramente por terceros",
                "Errores o desactualizaciones en la información proveniente de servicios externos integrados",
              ].map((item) => (
                <li key={item} className="text-white/80 flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">⚠</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-white/70 text-sm">
              Estas exclusiones no aplican en casos donde el daño sea consecuencia directa de dolo o
              culpa grave imputable a PICHANGON, conforme al artículo 50(a) del Código de Protección
              y Defensa del Consumidor.
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
              PICHANGON puede modificar estos Términos y Condiciones en cualquier momento.
            </p>
            <p className="text-white/80 leading-relaxed mb-4">
              Cuando se realicen <span className="text-pichangon-accent font-semibold">cambios sustanciales</span> que
              afecten derechos u obligaciones de los usuarios, se notificará con un mínimo de 10 días
              calendario de anticipación a través de la App o por correo electrónico registrado.
            </p>
            <p className="text-white/80 leading-relaxed mb-4">
              Ante un cambio sustancial, el usuario tendrá las siguientes opciones:
            </p>
            <ul className="space-y-2 mb-4">
              {[
                "Aceptar expresamente los nuevos Términos mediante confirmación en la App.",
                "Rechazarlos y solicitar la eliminación de su cuenta sin penalidad alguna.",
              ].map((item) => (
                <li key={item} className="text-white/80 flex items-start gap-2">
                  <span className="text-pichangon-accent mt-1">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-white/70 text-sm">
              El uso continuado de la App tras el periodo de notificación, sin manifestación en contrario,
              se considerará aceptación de los cambios únicamente para modificaciones menores (correcciones
              de redacción, actualizaciones de contacto, ajustes formales).
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
              Estos Términos se rigen por las leyes de la República del Perú, incluyendo el Código de
              Protección y Defensa del Consumidor (Ley N.° 29571) y la Ley de Protección de Datos
              Personales (Ley N.° 29733).
            </p>
            <p className="text-white/80 leading-relaxed">
              Cualquier controversia será resuelta ante los tribunales competentes de Lima, Perú.
            </p>
          </div>
        </section>

        {/* 14. Derechos del Titular de Datos Personales */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            14. Derechos del Titular de Datos Personales
          </h2>
          <div className="bg-pichangon-dark-card rounded-xl p-6 border border-white/10">
            <p className="text-white/80 leading-relaxed mb-4">
              En cumplimiento de la Ley N.° 29733 y el Decreto Supremo N.° 016-2024-JUS, el usuario
              titular de datos personales tiene derecho a:
            </p>
            <ul className="space-y-3 mb-6">
              {[
                { label: "Acceso:", value: "Conocer qué datos personales suyos son tratados por PICHANGON y con qué finalidad." },
                { label: "Rectificación:", value: "Solicitar la corrección de datos inexactos, incompletos o desactualizados." },
                { label: "Cancelación:", value: "Solicitar la eliminación de sus datos cuando ya no sean necesarios para la finalidad con que fueron recopilados, sujeto a los plazos de retención indicados en la Cláusula 9." },
                { label: "Oposición:", value: "Oponerse al tratamiento de sus datos para finalidades específicas cuando exista causa legítima." },
              ].map((item) => (
                <li key={item.label} className="text-white/80 flex items-start gap-2">
                  <span className="text-pichangon-accent mt-1">•</span>
                  <span>
                    <span className="font-semibold text-pichangon-accent">{item.label}</span>{" "}
                    {item.value}
                  </span>
                </li>
              ))}
            </ul>
            <p className="text-white/80 font-semibold mb-3">Cómo ejercer estos derechos:</p>
            <p className="text-white/80 leading-relaxed mb-4">
              El usuario puede enviar su solicitud a{" "}
              <a
                href="mailto:contacto@pichangon.com"
                className="text-pichangon-accent hover:text-pichangon-accent/80 font-semibold"
              >
                contacto@pichangon.com
              </a>{" "}
              indicando: nombre completo, correo registrado en la App, derecho que desea ejercer y
              descripción de su solicitud.
            </p>
            <p className="text-white/70 text-sm">
              PICHANGON responderá en un plazo máximo de{" "}
              <span className="font-semibold text-white/80">20 días hábiles</span> desde la recepción
              de la solicitud, conforme a lo establecido en la normativa vigente.
            </p>
          </div>
        </section>

        {/* 15. Contacto */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            15. Contacto
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
            © 2026 PICHANGON. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </div>
  );
}