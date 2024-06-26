import { SlashCommandBuilder, EmbedBuilder, CommandInteraction } from 'discord.js'


module.exports = {
	data: new SlashCommandBuilder()
		.setName('ban')
        .addUserOption(option => option.setName('user').setDescription('The user to ban').setRequired(true))
        .addStringOption(option => option.setName('reason').setDescription('The reason for the ban'))
		.setDescription('bans a user from the server'),
	async execute(interaction: CommandInteraction) {
        const user = interaction.options.getUser('user');
        const reason = interaction.options.get('reason')?.value || 'No reason provided';
        const embed = new EmbedBuilder()
			.setAuthor({ name: user?.username + ' has been kicked from the server.', iconURL: user?.displayAvatarURL()})
			.setThumbnail(interaction.guild!.iconURL({ extension: 'png' }))
			.addFields(
                { name: `Member`,value: `${user?.username}`, inline: true },
                { name: `Reason`,value: `${reason}`, inline: true },
                { name: `Date`,value: `${Date.now().toLocaleString()}`, inline: false },
            )

		return interaction.channel?.send({ embeds: [embed] })
    
	}
}