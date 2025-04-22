import { QuestionType } from "~/types/quiz"

const QuestionTypeTranslation: Record<QuestionType, string> = {
  [QuestionType.MULTI_CHOICE]: "Múltipla Escolha",
  [QuestionType.TRUE_OR_FALSE]: "Verdadeiro ou Falso",
  [QuestionType.TEXT]: "Texto",
}

export function translateQuestionType(type: QuestionType): string {
  return QuestionTypeTranslation[type] || type;
}