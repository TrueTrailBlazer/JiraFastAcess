document.addEventListener('DOMContentLoaded', () => {
  updateGreeting();
  initTheme();
  document.getElementById("openButton").addEventListener("click", openUrls);
});

// ========== TEMA ==========
function initTheme() {
  const themeToggle = document.getElementById('themeToggle');
  const themeLabel = document.getElementById('themeLabel');
  
  // Carregar estado salvo
  chrome.storage.sync.get(['isLightTheme'], (result) => {
    const isLight = !!result.isLightTheme;
    themeToggle.checked = isLight;
    document.body.classList.toggle('light-theme', isLight);
    themeLabel.textContent = isLight ? 'Modo Claro' : 'Modo Escuro';
  });

  // Listener para alterações
  themeToggle.addEventListener('change', (event) => {
    const isLight = event.target.checked;
    document.body.classList.toggle('light-theme', isLight);
    themeLabel.textContent = isLight ? 'Modo Claro' : 'Modo Escuro';
    chrome.storage.sync.set({ isLightTheme: isLight });
  });
}

// ========== SAUDAÇÃO ==========
function updateGreeting() {
  const hour = new Date().getHours();
  let greeting = 'Boa noite';
  
  if (hour >= 5 && hour < 12) greeting = 'Bom dia';
  else if (hour >= 12 && hour < 18) greeting = 'Boa tarde';

  document.getElementById('greeting').textContent = `${greeting}! 👋`; 
}

// ========== LÓGICA PRINCIPAL ==========
function openUrls() {
  const baseUrl = "https://delfia.atlassian.net/";
  const input = document.getElementById("codeInput").value;
  const codes = input.split("\n").filter(code => code.trim() !== '');
  const errorElement = document.getElementById("errorMessage");
  
  const successMessages = [
    "🚀 Foguete não tem ré! Todos os chamados abertos!",
    "🎯 Na mosca! Tickets prontos para ação!",
    "🪂 Pouso seguro! Tickets abertos sem turbulência!",
    "🛠️ Mãos à obra! Tudo carregado!",
    "🚨 Alerta de produtividade! Chamados abertos sem delays!",
    "📤 Chamados enviados! Processamento em tempo recorde!"
  ];

  errorElement.textContent = "";
  errorElement.style.color = "#FF4040";

  if (codes.length === 0) {
    errorElement.textContent = "⚠️ Por favor, insira pelo menos um código válido.";
    return;
  }

  const validUrls = [];
  const errors = [];

  codes.forEach((code, index) => {
    const cleanedCode = code
      .trim()
      .replace(/^['"‘’“”]+|['"‘’“”]+$/g, '')
      .replace(/['"‘’“”]{2,}/g, '');

    if (!cleanedCode) return;

    const normalizedCode = cleanedCode.toUpperCase();

    if (normalizedCode.startsWith("1-")) {
      validUrls.push(`${baseUrl}issues/?jql=summary~"${encodeURIComponent(cleanedCode)}"`);
    } 
    else if (
      normalizedCode.startsWith("TE-") || 
      normalizedCode.startsWith("FSA-") || 
      normalizedCode.startsWith("VLV-") ||
      normalizedCode.startsWith("EEM-") ||  // Novo padrão
      normalizedCode.startsWith("FS-")      // Novo padrão
    ) {
      validUrls.push(`${baseUrl}browse/${normalizedCode}`);
    } 
    else {
      errors.push(`⚠️ Linha ${index + 1}: <strong>"${code}"</strong> - Código inválido`);
    }
  });

  if (errors.length > 0) {
    errorElement.innerHTML = `Erros encontrados:<br>${errors.join("<br>")}`;
  } 
  else if (validUrls.length > 0) {
    const randomIndex = Math.floor(Math.random() * successMessages.length);
    errorElement.textContent = successMessages[randomIndex];
    errorElement.style.color = "#25D366";
    
    validUrls.forEach(url => {
      chrome.tabs.create({ url, active: false });
    });
  }
}