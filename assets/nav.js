async function loadDiscordLink() {
  try {
    response = await fetch('/assets/links/discord.txt');
    // Fallback message
    const discordUrl = "javascript:alert('Could not get URL, sorry.');"; 
    if (!response.ok) {
      console.error('Discord link not found');
    } else {
      discordUrl = (await response.text()).trim();
    }
    if (!discordUrl) {
      console.error('Discord link empty');
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
    const response = await fetch('/assets/nav.html');
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
