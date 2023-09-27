let repositories;

const fetchRepositories = async () => {
    try {
        const response = await fetch('https://api.github.com/users/ritwik/repos?per_page=100', { method: 'GET' });

        if (response.status !== 200) {
            console.error('Error:', response.status);
            return;
        }

        const result = await response.json();
        repositories = result.length;
    } catch (error) {
        console.error('Error:', error)
    }
};

(async () => {
    try {
        await fetchRepositories()
    } catch (error) {
        console.error("Error:", error);
        return ''
    }
})()

module.exports = {
    hostname: 'ritwik.s',
    osIdentifiers: [
        { identifier: "Win", name: "Windows" },
        { identifier: "Mac", name: "macOS" },
        { identifier: "Linux", name: "Linux" },
        { identifier: "Android", name: "Android" },
        { identifier: "iOS", name: "iOS" },
    ],
    emptySuResponses: [
        "An empty 'su'? Clearly, you're a master of the command line arts. 🧐",
        "Empty 'su'? You've truly embraced the minimalist approach to computing. 👏",
        "An empty 'su'... Pure poetry in the world of command lines. 📜",
        "Ah, an empty 'su' A masterpiece of command line ambiguity. Bravo! 👑",
        "Empty 'su'? You've stumbled into the virtual land of whimsy! 🌈",
        "No 'su' command? It's a sign to dance like nobody's watching! 💃🕺",
        "Empty 'su,' but brimming with virtual awesomeness! Let's make magic happen! ✨",
        "An empty 'su'? Are you trying to achieve coding Nirvana, one command at a time? 🧘‍♂️",
        "Empty 'su' commands are like debugging mysteries waiting to be solved. 🔍🐞",
        "Empty 'su'? Clearly, you're optimizing for maximum suspense in your coding journey. ⏳",
        "Empty 'su' commands are like code comments: full of potential but somewhat cryptic. 🤔📝",
        "An empty 'su'? You've just written a null pointer exception in the coding universe. 🌌💥",
        "When life gives you an empty 'su,' make it an opportunity for coding humor! 😄💻",
        "An empty 'su'? A true hacker's way of keeping secrets in plain sight. 🕵️‍♂️🔒",
        "Empty 'su' commands are like hidden Easter eggs in the world of coding. 🐣🍫"
    ],
    files: ['portfolio.md', 'skills.json', 'contact.md'],
    skills: {
        languages: ['javascript', 'python', 'java', 'html', 'css', 'C', 'C++', 'dart', 'micropython'],
        frameworks: ['node.js', 'express.js', 'sequelize', 'react.js', 'next.js', 'flutter', 'bootstrap'],
        databases: ['sql', 'nosql', 'postgresql', 'mongodb', 'mysql'],
        tools: ['git', 'vscode', 'nvm', 'android-studio', 'sass', 'opencv'],
        misc: ['linux', 'rest-api', 'jupyter-notebook', 'matplotlib', 'numpy', 'pandas', 'tkinter', 'kivy', 'pyqt', 'pygame', 'raspberry-pi']
    },
    contact: [
        { title: "ritwikrajsingh2 @ twitter", url: "https://twitter.com/ritwikrajsingh2" },
        { title: "ritwikrajsingh @ linkedin", url: "https://linkedin.com/in/ritwikrajsingh" },
        { title: "ritwik_raj_singh @ telegram", url: "https://t.me/ritwik_raj_singh" },
        { title: "the_demon @ discord", url: "https://discordapp.com/users/742510458811973712" },
    ],

    portfolio: async () => {
        try {
            await fetchRepositories();

            const portfolioData = [
                {
                    title: 'GitHub',
                    description: 'My github profile',
                    additionalInfo: repositories ? repositories > 1 ? `${repositories} repos` : `${repositories} repo` : "", url: 'https://github.com/ritwikrajsingh'
                },
                { title: 'CodeDemon', description: 'My previous portfolio website', additionalInfo: 'which which doesn\'t work', url: 'https://ritwikrajsingh.github.io' },
                { title: 'Tunica.tech', description: 'My page on their website', additionalInfo: null, url: 'https://tunicalabsmedia.com/meet/ritwik-raj-singh' },
            ]
            return portfolioData;
        } catch (error) {
            console.error("Error:", error);
            return '';
        }
    }
}