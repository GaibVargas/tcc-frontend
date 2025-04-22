import ExcelJS from "exceljs"
import type { SessionReport } from "~/types/session"

export async function exportSessionReportToExcel(
  session: SessionReport
): Promise<Blob> {
  const workbook = new ExcelJS.Workbook()
  workbook.creator = "QAV (Quiz ao vivo)"
  workbook.created = new Date()

  const applyHeaderStyle = (cell: ExcelJS.Cell) => {
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FF1659BF" },
    }
    cell.font = {
      bold: true,
      color: { argb: "FFFFFFFF" },
    }
    cell.alignment = { vertical: "middle" }
  }

  const playersSheet = workbook.addWorksheet("Jogadores")
  playersSheet.columns = [
    { header: "Nome", key: "name", width: 30 },
    { header: "Nota", key: "grade", width: 10 },
    { header: "Pontuação", key: "score", width: 15 },
  ]
  playersSheet.getRow(1).eachCell((cell) => applyHeaderStyle(cell))

  session.players.forEach((player) => {
    playersSheet.addRow({
      name: player.user.name,
      grade: (player.grade * 10).toFixed(2).replace(".", ","),
      score: player.score,
    })
  })

  const questionsSheet = workbook.addWorksheet("Perguntas")
  questionsSheet.columns = [
    { header: "Descrição", key: "description", width: 50 },
    { header: "Tipo", key: "type", width: 20 },
    { header: "% de Acertos", key: "correct_answer_percentage", width: 20 },
  ]
  questionsSheet.getRow(1).eachCell((cell) => applyHeaderStyle(cell))

  const answersSheet = workbook.addWorksheet("Respostas")
  answersSheet.columns = [
    { header: "Pergunta", key: "question", width: 50 },
    { header: "Jogador", key: "player", width: 30 },
    { header: "Resposta", key: "given_answer", width: 30 },
    { header: "Correta?", key: "is_correct", width: 10 },
  ]
  answersSheet.getRow(1).eachCell((cell) => applyHeaderStyle(cell))

  session.quiz.questions.forEach((question) => {
    questionsSheet.addRow({
      description: question.description,
      type: translateQuestionType(question.type),
      correct_answer_percentage: `${(question.correct_answer_percentage * 100)
        .toFixed(2)
        .replace(".", ",")}%`,
    })
    question.answers.forEach((answer) => {
      answersSheet.addRow({
        question: question.description,
        player: answer.player.user.name,
        given_answer: answer.given_answer,
        is_correct: answer.is_correct ? "Sim" : "Não",
      })
    })
  })

  const buffer = await workbook.xlsx.writeBuffer()
  return new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  })
}
