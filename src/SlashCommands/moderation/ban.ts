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
        const banEmbed = new EmbedBuilder()
            .setColor('#74F58F')
            .setTitle('Ban Command')
            .setAuthor({ name: interaction.user.username , iconURL: interaction.user.displayAvatarURL()})
            .setDescription(`🔨 | ${user?.username} has been banned for: **${reason}**`)
        await interaction.reply({ embeds: [banEmbed] })
	}
}