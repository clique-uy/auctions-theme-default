"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { ThemeBlockConfig } from "@/components/theme/types";

interface QuestionLink {
  question: string;
  answer: string;
}

const QuestionAndAnswer = {
  label: "Preguntas y respuestas",
  fields: {
    heading: { type: "text", label: "Título", contentEditable: true },
    questions: {
      type: "array",
      label: "Preguntas",
      getItemSummary: (item: QuestionLink) => item.question || "Pregunta",
      defaultItemProps: { question: "Pregunta", answer: "Respuesta" },
      arrayFields: {
        question: { type: "text", label: "Pregunta" },
        answer: { type: "textarea", label: "Respuesta" },
      },
    },
  },
  defaultProps: {
    heading: "Preguntas frecuentes",
    questions: [
      {
        question: "¿Cómo participo en una subasta?",
        answer:
          "Registrate, verificá tu cuenta y ofertá desde el lote o la sala en vivo. El equipo de la casa confirma cada puja.",
      },
      {
        question: "¿Puedo examinar un lote antes de ofertar?",
        answer:
          "Sí. Coordiná una visita o consulta con la casa durante las fechas de exhibición publicadas para cada remate.",
      },
      {
        question: "¿Qué ocurre cuando gano un lote?",
        answer:
          "Recibirás las instrucciones de pago, retiro y envío. El lote se reserva hasta completar la liquidación.",
      },
    ],
  },
  render: ({
    heading,
    questions,
  }: {
    heading: string;
    questions: QuestionLink[];
  }) => {
    const items = questions ?? [];

    return (
      <section className="mx-auto w-full max-w-[1190px] px-6 py-12 md:px-8 md:py-16">
        {heading ? (
          <h2 className="mb-8 border-y border-[#e9e4df] py-5 text-center font-serif text-[23px] font-normal tracking-normal text-[#5d5755]">
            {heading}
          </h2>
        ) : null}

        {items.length === 0 ? (
          <p className="py-10 text-center font-serif text-[13px] leading-relaxed text-[#716a66]">
            Aún no hay preguntas.
          </p>
        ) : (
          <Accordion keepMounted className="magallanes-faq w-full">
            {items.map((item, index) => (
              <AccordionItem
                key={`${item.question}-${index}`}
                value={`question-${index}`}
                className="border-b border-[#e9e4df] last:border-b"
              >
                <AccordionTrigger className="rounded-none py-5 font-serif text-[17px] font-normal text-[#413c3a] hover:no-underline hover:text-[#9b6f52] **:data-[slot=accordion-trigger-icon]:text-[#c89573]">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="pb-5 font-serif text-[13px] leading-[1.6] text-[#625c59] whitespace-pre-wrap">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </section>
    );
  },
} satisfies ThemeBlockConfig;

export default QuestionAndAnswer;
