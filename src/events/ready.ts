const { Events, ActivityType } = require ('discord.js')

module.exports = {
	name:Events.ClientReady,
	once:true,

	execute(client: any) {
		console.log(`Miek's Moderation bot is online | ${client.user.tag}`)
		client.user.setStatus('online')
		client.user.setActivity('over you', { type: ActivityType.Watching })
	}

}