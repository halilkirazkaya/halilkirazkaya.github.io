/* --- JAVASCRIPT LOGIC --- */
const outputDiv = document.getElementById('output');
const commandInput = document.getElementById('command-input');
const terminal = document.getElementById('terminal');

// Helper functions for coloring text
const color = (text, code) => `<span style="color:${code}">${text}</span>`;
const green = (t) => color(t, "#7ee787");
const blue = (t) => color(t, "#58a6ff");
const yellow = (t) => color(t, "#f2cc60");
const purple = (t) => color(t, "#d2a8ff");
const red = (t) => color(t, "#ff7b72");

// Command Data
const commands = {
    help: `
${yellow("Available Commands:")}
  ${green("whoami")}    - Professional summary, skills & certs
  ${green("projects")}  - Open source tools & contributions
  ${green("contact")}   - Social links & email
  ${green("clear")}     - Clear the terminal screen
`,

    whoami: `
${purple("Hello, Friend.")}

${blue(":: ABOUT ME ::")}
I'm ${yellow("Halil Kirazkaya")}, a Cybersecurity Researcher & Pentester.
I don't just find vulnerabilities, I like to build the tools to automate the hunt.

${blue(":: BACKGROUND ::")}
My passion lies in offensive security, specifically in ${green("Web & Network Exploitation")}, 
${green("PoC Development")} and ${green("Exploit Dev")}. I actively contribute to the open-source 
community by writing custom templates and developing security tools.

${blue(":: CREDENTIALS ::")}
• ${purple("eWPTX")} - INE Security
• ${purple("PJPT")}  - TCM Security
`,

    projects: `
${blue(":: PROJECTS ::")}

 ${yellow("arsenal-ng")}
   The classic launcher, evolved. A blazing fast, Go-based command library 
   equipped with 150+ cybersecurity cheat-sheets.

 ${yellow("nuclei-templates")}
   Developed 250+ custom Nuclei templates for open-source scanners to 
   enhance automated vulnerability detection.
`,

    contact: `
${blue(":: CONTACT ::")}

GitHub:   <a href="https://github.com/halilkirazkaya" target="_blank">github.com/halilkirazkaya</a>
LinkedIn: <a href="https://www.linkedin.com/in/halilkirazkaya/" target="_blank">linkedin.com/in/halilkirazkaya</a>
Email:    <a href="mailto:kirazkayahalil@gmail.com">kirazkayahalil@gmail.com</a>
`,
    
    clear: ""
};

// Text-Only Welcome Message (ASCII Art removed)
const banner = `
Welcome to the personal website of ${yellow("Halil Kirazkaya")}.
Type ${green("'help'")} to view available commands.
`;

// Initialization
window.onload = () => {
    printOutput(banner);
    commandInput.focus();
};

// Focus management
document.addEventListener('click', (e) => {
    // Allow selecting text, but focus input if just clicking background
    if (window.getSelection().toString() === "") {
        commandInput.focus();
    }
});

// Command handling
commandInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        const input = this.value.trim().toLowerCase();
        
        if (input) {
            // Add command history
            outputDiv.innerHTML += `<div class="command-history"><span style="color:#7ee787">visitor@halilkirazkaya</span><span style="color:#d2a8ff">:~$</span> ${this.value}</div>`;
            
            // Process command
            if (input === 'clear') {
                outputDiv.innerHTML = "";
            } else if (commands[input]) {
                printOutput(commands[input]);
            } else {
                printOutput(`Command not found: ${red(input)}. Type ${green("'help'")} for options.`);
            }
        }
        
        this.value = '';
        scrollToBottom();
    }
});

function printOutput(text) {
    outputDiv.innerHTML += `<div class="output-line">${text}</div>`;
    scrollToBottom();
}

function scrollToBottom() {
    terminal.scrollTop = terminal.scrollHeight;
}
