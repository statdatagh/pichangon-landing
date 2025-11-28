import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "¿Cómo funciona PICHANGON?",
    answer: "PICHANGON es una plataforma que conecta jugadores de fútbol en Perú. Puedes buscar pichangas cerca de ti, unirte a grupos, reservar tu lugar y coordinar todo desde la app. Es tan simple como descargar, buscar un partido y jugar."
  },
  {
    question: "¿Cómo puedo unirme a un partido?",
    answer: "Una vez descargada la app, explora los partidos disponibles en tu zona. Selecciona el que te interese, revisa los detalles (ubicación, hora, precio) y confirma tu asistencia. Recibirás una notificación con toda la información necesaria."
  },
  {
    question: "¿Cualquiera puede crear un partido nuevo?",
    answer: "Sí, cualquier usuario puede organizar una pichanga. Solo necesitas crear un evento, establecer la fecha, hora, ubicación y precio (si aplica). Otros jugadores podrán ver tu partido y unirse fácilmente."
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left Side - Intro */}
            <div className="lg:sticky lg:top-32">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                ¿Alguna pregunta?
                <br />
                <span className="text-pichangon-accent">Estamos para ayudarte.</span>
              </h2>
              <p className="text-white/70 text-lg max-w-md">
                Nuestra sección de preguntas frecuentes es un buen lugar para comenzar si tienes dudas sobre las pichangas, cómo operamos, qué esperar o si quieres más detalles sobre cómo asociarte con nosotros.
              </p>
            </div>

            {/* Right Side - Questions */}
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="card-dark border border-white/10 overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => toggleQuestion(index)}
                    className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left hover:bg-white/5 transition-colors"
                  >
                    <h3 className="text-white font-semibold text-lg">
                      {faq.question}
                    </h3>
                    <ChevronDown
                      className={`w-5 h-5 text-pichangon-accent flex-shrink-0 transition-transform duration-200 ${
                        openIndex === index ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openIndex === index ? "max-h-96" : "max-h-0"
                    }`}
                  >
                    <div className="px-6 pb-5 pt-2">
                      <p className="text-white/70 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}