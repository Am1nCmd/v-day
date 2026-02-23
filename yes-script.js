let musicPlaying = false

// Telegram Bot Configuration - dari config.js atau environment
const telegramConfig = window.TELEGRAM_CONFIG || { botToken: '', chatId: '' }

// Send notification to Telegram
async function sendTelegramNotification() {
    if (!telegramConfig.botToken || !telegramConfig.chatId) {
        console.log('Telegram config tidak ditemukan, skip notifikasi')
        return
    }

    const message = '🎉 Ce Nisa bersedia video call nanti malem! 💕'
    const url = `https://api.telegram.org/bot${telegramConfig.botToken}/sendMessage`

    try {
        await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: telegramConfig.chatId,
                text: message
            })
        })
    } catch (error) {
        console.log('Gagal kirim notif:', error)
    }
}

window.addEventListener('load', () => {
    launchConfetti()
    sendTelegramNotification() // Kirim notif ke Telegram

    // Autoplay music (works since user clicked Yes to get here)
    const music = document.getElementById('bg-music')
    music.volume = 0.3
    music.play().catch(() => {})
    musicPlaying = true
    document.getElementById('music-toggle').textContent = '🔊'
})

function launchConfetti() {
    const colors = ['#ff69b4', '#ff1493', '#ff85a2', '#ffb3c1', '#ff0000', '#ff6347', '#fff', '#ffdf00']
    const duration = 6000
    const end = Date.now() + duration

    // Initial big burst
    confetti({
        particleCount: 150,
        spread: 100,
        origin: { x: 0.5, y: 0.3 },
        colors
    })

    // Continuous side cannons
    const interval = setInterval(() => {
        if (Date.now() > end) {
            clearInterval(interval)
            return
        }

        confetti({
            particleCount: 40,
            angle: 60,
            spread: 55,
            origin: { x: 0, y: 0.6 },
            colors
        })

        confetti({
            particleCount: 40,
            angle: 120,
            spread: 55,
            origin: { x: 1, y: 0.6 },
            colors
        })
    }, 300)
}

function toggleMusic() {
    const music = document.getElementById('bg-music')
    if (musicPlaying) {
        music.pause()
        musicPlaying = false
        document.getElementById('music-toggle').textContent = '🔇'
    } else {
        music.play()
        musicPlaying = true
        document.getElementById('music-toggle').textContent = '🔊'
    }
}
