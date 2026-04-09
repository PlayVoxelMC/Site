async function loadDiscordLink() {
  try {
    const response = await fetch('assets/links/discord.txt');
    if (!response.ok) {
      throw new Error('Discord link not found');
    }
    const discordUrl = (await response.text()).trim();
    if (!discordUrl) {
      throw new Error('Discord link empty');
    }
    const navLink = document.getElementById('nav-discord-link');
    const pageLink = document.getElementById('discord-block');
    if (navLink) navLink.href = discordUrl;
    if (pageLink) pageLink.href = discordUrl;
  } catch (error) {
    console.warn('Unable to load Discord link', error);
  }
}

async function loadNav() {
  if (!('fetch' in window)) return;

  try {
    const response = await fetch('nav.html');
    if (!response.ok) {
      throw new Error('Nav file not found');
    }
    const html = await response.text();
    const placeholder = document.getElementById('nav-placeholder');
    if (placeholder) {
      placeholder.innerHTML = html;
    }
    await loadDiscordLink();
  } catch (error) {
    console.warn('Unable to load nav', error);
  }
}

loadNav();
