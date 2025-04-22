import confetti from 'canvas-confetti'

export const useConfetti = () => {
  const fireConfetti = () => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.8 },
    })
  }

  return { fireConfetti }
}
