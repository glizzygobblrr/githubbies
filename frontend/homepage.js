function toggleScreen(screenId) {
    const screen = document.getElementById(screenId);
    if (screen.style.display === 'none') {
        screen.style.display = 'flex';
    } else {
        screen.style.display = 'none';
    }
}

