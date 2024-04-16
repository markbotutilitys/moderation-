import { SlashCommandBuilder, EmbedBuilder } from 'discord.js'


module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with the Bots Ping!'),
	async execute(interaction: any) {

		const pingEmbed = new EmbedBuilder()
			.setColor('#74F58F')
			.setTitle('Ping Command')
			.setAuthor({ name: 'VangoPvP Bot' })
			.setDescription(`🏓 | Latency is: **${Date.now() - interaction.createdTimestamp}ms.**`)

		await interaction.reply({ embeds: [pingEmbed] })
	}
}