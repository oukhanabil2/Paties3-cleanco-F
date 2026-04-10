// ==================== PARTIE 1 : CONSTANTES, VARIABLES, INITIALISATION ====================

const JOURS_FRANCAIS = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
const MOIS_FRANCAIS = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
const SHIFT_LABELS = {
    '1': 'Matin', '2': 'Après-midi', '3': 'Nuit', 'R': 'Repos', 'C': 'Congé',
    'M': 'Maladie', 'A': 'Autre absence', '-': 'Non défini'
};
const SHIFT_COLORS = {
    '1': '#3498db', '2': '#e74c3c', '3': '#9b59b6', 'R': '#2ecc71',
    'C': '#f39c12', 'M': '#e67e22', 'A': '#95a5a6', '-': '#7f8c8d'
};
const DATE_AFFECTATION_BASE = new Date('2025-11-01');

let agents = [];
let planningData = {};
let holidays = [];
let panicCodes = [];
let radios = [];
let uniforms = [];
let warnings = [];
let leaves = [];
let radioHistory = [];
let auditLog = [];
let jokerAssignments = {};
let replacementNotifications = [];

let jokerConfig = {
    maxPerDay: 1,
    manualAssignment: true
};

document.addEventListener('DOMContentLoaded', () => {
    loadData();
    if (agents.length === 0) initializeTestData();
    displayMainMenu();
    checkExpiredWarnings();
});

function loadData() {
    agents = JSON.parse(localStorage.getItem('sga_agents') || '[]');
    planningData = JSON.parse(localStorage.getItem('sga_planning') || '{}');
    holidays = JSON.parse(localStorage.getItem('sga_holidays') || '[]');
    panicCodes = JSON.parse(localStorage.getItem('sga_panic_codes') || '[]');
    radios = JSON.parse(localStorage.getItem('sga_radios') || '[]');
    uniforms = JSON.parse(localStorage.getItem('sga_uniforms') || '[]');
    warnings = JSON.parse(localStorage.getItem('sga_warnings') || '[]');
    leaves = JSON.parse(localStorage.getItem('sga_leaves') || '[]');
    radioHistory = JSON.parse(localStorage.getItem('sga_radio_history') || '[]');
    auditLog = JSON.parse(localStorage.getItem('sga_audit_log') || '[]');
    replacementNotifications = JSON.parse(localStorage.getItem('sga_replace_notif') || '[]');
    if (holidays.length === 0) initializeHolidays();
    jokerAssignments = {};
    const savedJokerConfig = localStorage.getItem('sga_joker_config');
    if (savedJokerConfig) jokerConfig = JSON.parse(savedJokerConfig);
}

function saveData() {
    localStorage.setItem('sga_agents', JSON.stringify(agents));
    localStorage.setItem('sga_planning', JSON.stringify(planningData));
    localStorage.setItem('sga_holidays', JSON.stringify(holidays));
    localStorage.setItem('sga_panic_codes', JSON.stringify(panicCodes));
    localStorage.setItem('sga_radios', JSON.stringify(radios));
    localStorage.setItem('sga_uniforms', JSON.stringify(uniforms));
    localStorage.setItem('sga_warnings', JSON.stringify(warnings));
    localStorage.setItem('sga_leaves', JSON.stringify(leaves));
    localStorage.setItem('sga_radio_history', JSON.stringify(radioHistory));
    localStorage.setItem('sga_audit_log', JSON.stringify(auditLog));
    localStorage.setItem('sga_joker_config', JSON.stringify(jokerConfig));
    localStorage.setItem('sga_replace_notif', JSON.stringify(replacementNotifications));
}

function initializeTestData() {
    agents = [
      // Groupe A
    { code: 'CPA', nom: 'OUKHA', prenom: 'NABIL', groupe: 'A', tel: '0681564713', adresse: 'sala Al jadida', code_panique: '', poste: 'CP', cin: 'A758609', date_naissance: '1974-11-05', matricule: 'S09278C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    { code: 'CONA', nom: 'EL JAMALI', prenom: 'Younes', groupe: 'A', tel: '0663290648', adresse: 'cym', code_panique: '', poste: 'CON', cin: 'A370180', date_naissance: '1992-09-04', matricule: 'S09425C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    { code: 'MOTA', nom: 'Mokaddim', prenom: 'MOHAMED', groupe: 'A', tel: '0611160166', adresse: 'sale', code_panique: '', poste: 'MOT', cin: 'CB230482', date_naissance: '1968-10-20', matricule: 'S09279C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    { code: 'ZA', nom: 'DRAFA', prenom: 'Noureddine', groupe: 'A', tel: '0603482589', adresse: 'tamasna', code_panique: '815', poste: 'ZA', cin: '469875', date_naissance: '1974-05-15', matricule: 'S09179C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    { code: 'Z2A', nom: 'KAROUCHE', prenom: 'Fayçal', groupe: 'A', tel: '', adresse: 'DP1400', code_panique: '', poste: 'Z2A', cin: '743534', date_naissance: '', matricule: 'S13273C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    { code: 'Z5A', nom: 'LAWRIQAT TARIK', prenom: 'TARIK', groupe: 'A', tel: '0615296161', adresse: '', code_panique: 'DP1400', poste: 'Z5A', cin: '794204', date_naissance: '1979-04-17', matricule: 'S11699C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    { code: 'l1A', nom: 'KAMOUN', prenom: 'YOUNES', groupe: 'A', tel: '', adresse: '', code_panique: 'DP1400', poste: 'l1', cin: 'C436844', date_naissance: '1971-05-12', matricule: 'S09180C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
          { code: 'I2A', nom: 'SADOUK', prenom: 'NAIL', groupe: 'A', tel: '0664713', adresse: 'sala  jadida', code_panique: '', poste: 'I2', cin: 'A8609', date_naissance: '1984-11-05', matricule: 'S09278C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
  
    { code: 'Z7A', nom: 'CHERKAOUI', prenom: 'NOUAMANA', groupe: 'A', tel: '', adresse: 'DP1400', code_panique: '', poste: 'Z7A', cin: 'D216143', date_naissance: '1992-12-01', matricule: 'S11869C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    { code: 'O1aA', nom: 'ALAMI', prenom: 'ZAKARIA', groupe: 'A', tel: '0660269360', adresse: '', code_panique: '913', poste: 'O1a', cin: 'D990488', date_naissance: '1987-06-02', matricule: 'S09188C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    { code: 'O1bA', nom: 'EL KADMIRI', prenom: 'YASSINE', groupe: 'A', tel: '0707937021', adresse: '', code_panique: '228', poste: 'O1bA', cin: 'A253632', date_naissance: '1986-10-22', matricule: 'S12667C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    { code: 'O3A', nom: 'EL GHALLA', prenom: 'ABDELALI', groupe: 'A', tel: '0663391782', adresse: '', code_panique: '511', poste: 'O3A', cin: '729822', date_naissance: '1976-06-30', matricule: 'S09216C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    { code: 'O8A', nom: 'AIT LMKADAM', prenom: 'KAHCEN', groupe: 'A', tel: '0626521862', adresse: '', code_panique: '824', poste: 'O8', cin: 'PB42708', date_naissance: '1977-11-19', matricule: 'S09229C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    { code: 'O9A', nom: 'OUTANOUT', prenom: 'OMAR', groupe: 'A', tel: '06943677602', adresse: '', code_panique: '813', poste: 'O9A', cin: '651335', date_naissance: '1972-01-03', matricule: 'S09251C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    { code: 'O10A', nom: 'ZOUHRI', prenom: 'HAMID', groupe: 'A', tel: '0625615979', adresse: '', code_panique: '911', poste: 'O10', cin: 'Z155268', date_naissance: '1968-12-19', matricule: 'S09861C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    { code: 'O11A', nom: 'ARRADI', prenom: 'TARIK', groupe: 'A', tel: '', adresse: '', code_panique: '326', poste: 'O11A', cin: 'A345212', date_naissance: '1990-11-25', matricule: 'S09284C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    { code: 'O12A', nom: 'BOULAHFA', prenom: 'MOHAMED', groupe: 'A', tel: '0667877556', adresse: '', code_panique: '855', poste: 'O12', cin: 'FL33963', date_naissance: '1965-06-30', matricule: 'S09234C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    { code: 'O13A', nom: 'ZDIHRI', prenom: 'ABDERRAHIM', groupe: 'A', tel: '0667370493', adresse: '', code_panique: '826', poste: 'O13A', cin: 'B187620', date_naissance: '1967-11-05', matricule: 'S09204C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    { code: 'O15A', nom: 'AIT BENALI', prenom: 'ABLKRIM', groupe: 'A', tel: '0641103141', adresse: '', code_panique: '113', poste: 'O15A', cin: 'D171008', date_naissance: '1987-05-26', matricule: 'S12072C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    { code: 'O16A', nom: 'HOUMMAY MEHDI', prenom: 'MEHDI', groupe: 'A', tel: '0660994944', adresse: '', code_panique: '827', poste: 'O16A', cin: 'A33782', date_naissance: '1983-09-22', matricule: 'S09159C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    { code: 'L2A', nom: 'OUSSALLEM', prenom: 'KHALID', groupe: 'A', tel: '0715929737', adresse: '', code_panique: '126', poste: 'L 2A', cin: '653628', date_naissance: '1970-07-29', matricule: 'S09166C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
   { code: 'L4A', nom: 'Bentaib', prenom: 'KHLID', groupe: 'A', tel: '07129737', adresse: '', code_panique: '126', poste: 'L 4', cin: '653628', date_naissance: '1980-07-29', matricule: 'S091166C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    
    { code: 'L5A', nom: 'SLYI', prenom: 'MOHAMED', groupe: 'A', tel: '0649068606', adresse: '', code_panique: '913', poste: 'L5A', cin: 'B129122', date_naissance: '1965-03-22', matricule: 'S09212C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    { code: 'L6A', nom: 'KHTIDAK', prenom: 'HICHAM', groupe: 'A', tel: '0660124827', adresse: '', code_panique: '841', poste: 'L6A', cin: '766806', date_naissance: '1977-09-09', matricule: 'S09228C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    { code: 'L7A', nom: 'ECHOUHAIDI', prenom: 'RACHID', groupe: 'A', tel: '0670444699', adresse: '', code_panique: '327', poste: 'L7A', cin: '471850', date_naissance: '1974-02-24', matricule: 'S09254C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    { code: 'L8A', nom: 'ABOUKAL', prenom: 'SAID', groupe: 'A', tel: '0661541861', adresse: '', code_panique: '815', poste: 'L8A', cin: '418554', date_naissance: '1971-04-11', matricule: 'S09207C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    { code: 'L11A', nom: 'QOTBI', prenom: 'OTMAN', groupe: 'A', tel: '0681688161', adresse: '', code_panique: '125', poste: 'L11A', cin: 'A18238', date_naissance: '1986-11-19', matricule: 'S09156C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    { code: 'L13A', nom: 'ZEHDI', prenom: 'SALEM', groupe: 'A', tel: '0666788715', adresse: '', code_panique: '118', poste: 'L13A', cin: '569901', date_naissance: '1967-12-01', matricule: 'S10068C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    { code: 'L14A', nom: 'BOUNHAR', prenom: 'MOHAMED', groupe: 'A', tel: '0614445839', adresse: '', code_panique: '858', poste: 'L14A', cin: '772206', date_naissance: '1976-04-23', matricule: 'S09235C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    { code: 'L15A', nom: 'BOUCHRIHA', prenom: 'MOUNIR', groupe: 'A', tel: '0641871461', adresse: '', code_panique: '999', poste: 'L15A', cin: '774225', date_naissance: '1978-12-04', matricule: 'S09424C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    { code: 'L16A', nom: 'ROUANI', prenom: 'AYOUB', groupe: 'A', tel: '0612510273', adresse: '', code_panique: '328', poste: 'L16A', cin: 'A48291', date_naissance: '1991-06-07', matricule: 'S09172C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    { code: 'L18A', nom: 'EL KAHLAOUI', prenom: 'ABDELLAH', groupe: 'A', tel: '0671415745', adresse: '', code_panique: '826', poste: 'L18A', cin: '724698', date_naissance: '1975-02-18', matricule: 'S09199C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    { code: 'L20A', nom: 'FOZARI', prenom: 'ABDLILAH', groupe: 'A', tel: '0690108567', adresse: '', code_panique: '922', poste: 'L 20', cin: '', date_naissance: '', matricule: '', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    { code: 'O4A', nom: 'BOUAKRA', prenom: 'ABDELHAK', groupe: 'A', tel: '0673978815', adresse: '', code_panique: '313', poste: 'O4A', cin: '758824', date_naissance: '1972-02-04', matricule: 'S09197C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    { code: 'L4B', nom: 'YOUNES', prenom: 'KHODAYRA', groupe: 'B', tel: '0696893480', adresse: '', code_panique: '842', poste: 'L4A', cin: '660675', date_naissance: '1983-02-10', matricule: 'S09162C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    { code: 'Z6A', nom: 'MOHAMED', prenom: 'MOUSTAKIM', groupe: 'A', tel: '0654718291', adresse: '', code_panique: 'DP1400', poste: 'z6A', cin: '764411', date_naissance: '1975-07-15', matricule: 'S09246C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },

    // Groupe B
    { code: 'CPB', nom: 'CHMAREKH', prenom: 'Noureddine', groupe: 'B', tel: '0660337343', adresse: '', code_panique: '854', poste: 'CPA', cin: '604196', date_naissance: '1971-11-24', matricule: 'S09274C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    { code: 'CONB', nom: 'IBRAHIMY', prenom: 'ABDELLAHADIB', groupe: 'B', tel: '0662815350', adresse: '', code_panique: 'DP1400', poste: 'CON', cin: 'C475743', date_naissance: '1976-03-15', matricule: 'S09275C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    { code: 'MOTB', nom: 'KAALI', prenom: 'MAJID', groupe: 'B', tel: '0777934644', adresse: '', code_panique: 'DP1400', poste: 'MOT', cin: 'Q210329', date_naissance: '1978-11-25', matricule: 'S12666C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    { code: 'Z2B', nom: 'TSOULI', prenom: 'ADIL', groupe: 'B', tel: '0767872200', adresse: '', code_panique: 'DP1400', poste: 'Z2A', cin: '414286', date_naissance: '2020-07-01', matricule: 'S09170C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    { code: 'Z5B', nom: 'UN', prenom: 'YOS', groupe: 'B', tel: '', adresse: '', code_panique: 'DP1400', poste: 'Z5', cin: 'C436844', date_naissance: '1971-05-12', matricule: 'S09180C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    { code: 'Z6B', nom: 'ROCHDI', prenom: 'HASSAN', groupe: 'B', tel: '065539574', adresse: '', code_panique: 'DP1400', poste: 'z6', cin: '594182', date_naissance: '1969-10-15', matricule: 'S09173C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    
      { code: 'O1aB', nom: 'JELOULI', prenom: 'MAROUAN', groupe: 'B', tel: '0637401598', adresse: '', code_panique: '913', poste: 'O1a', cin: 'AB335545', date_naissance: '1986-01-30', matricule: 'S09186C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    { code: 'O1bB', nom: 'KADI', prenom: 'ANNOUAR', groupe: 'B', tel: '0642889596', adresse: '', code_panique: '228', poste: 'O1b', cin: 'AE110942', date_naissance: '1990-09-11', matricule: 'S12672C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    { code: 'O3B', nom: 'EL FADEL', prenom: 'MOHAMED', groupe: 'B', tel: '0762731541', adresse: '', code_panique: '511', poste: 'O3A', cin: '783152', date_naissance: '1976-12-15', matricule: 'S09239C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    { code: 'O5B', nom: 'HOUCINE', prenom: 'ASGHEN', groupe: 'B', tel: '0617152230', adresse: '', code_panique: '848', poste: 'O5', cin: 'CB42565', date_naissance: '1972-10-10', matricule: 'S09225C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    { code: 'O8B', nom: 'RIFKI', prenom: 'KAMAL', groupe: 'B', tel: '0677019711', adresse: '', code_panique: '824', poste: 'O8', cin: 'AB70661', date_naissance: '1982-05-26', matricule: 'S09185C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    { code: 'O9B', nom: 'HADIR', prenom: 'HAKIM', groupe: 'B', tel: '0622379633', adresse: '', code_panique: '813', poste: 'O9', cin: 'D217181', date_naissance: '1983-06-23', matricule: 'S09158C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    { code: 'O10B', nom: 'BELASRI', prenom: 'MOHAMED', groupe: 'B', tel: '0670108838', adresse: '', code_panique: '911', poste: 'O10', cin: 'A755100', date_naissance: '1971-05-25', matricule: 'S09244C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    { code: 'O11B', nom: 'MANSOURI', prenom: 'OUSSAAMA', groupe: 'B', tel: '0691484070', adresse: '', code_panique: '326', poste: 'O11A', cin: '728886', date_naissance: '1975-10-20', matricule: 'S09956C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    { code: 'O12B', nom: 'LAHYANE', prenom: 'MOHCINE', groupe: 'B', tel: '0676454181', adresse: '', code_panique: '855', poste: 'O12A', cin: '779095', date_naissance: '1981-02-06', matricule: 'S12134C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    { code: 'O13B', nom: 'ABDOUSSI', prenom: 'HASSAN', groupe: 'B', tel: '0645308599', adresse: '', code_panique: '826', poste: 'O13', cin: 'D424329', date_naissance: '1973-11-28', matricule: 'S09218C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    { code: 'O14B', nom: 'ABEID', prenom: 'MOHAMED', groupe: 'B', tel: '0663738283', adresse: '', code_panique: '838', poste: 'O14A', cin: '767986', date_naissance: '1972-06-12', matricule: 'S11698C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    { code: 'O15B', nom: 'FAKHAR', prenom: 'ABDEHADI', groupe: 'B', tel: '0648941710', adresse: '', code_panique: '113', poste: 'O15A', cin: 'A20765', date_naissance: '1988-11-08', matricule: 'S11645C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    { code: 'O16B', nom: 'NAIM', prenom: 'TAOUFIK', groupe: 'B', tel: '0636552127', adresse: '', code_panique: '827', poste: 'O16A', cin: '762084', date_naissance: '1972-12-15', matricule: 'S09250C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
        { code: 'L1B', nom: 'mmHI', prenom: 'MOHAMED', groupe: 'B', tel: '06614828', adresse: '', code_panique: '12', poste: 'L1', cin: '566655', date_naissance: '1979-03-20', matricule: 'S09243C', date_entree: '2026-11-01', date_sortie: null, statut: 'actif' },
    { code: 'L2B', nom: 'ZAHI', prenom: 'MOHAMED', groupe: 'B', tel: '0671614828', adresse: '', code_panique: '126', poste: 'L 2A', cin: '566655', date_naissance: '1969-03-20', matricule: 'S09243C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
        { code: '', nom: 'fgg', prenom: 'MOHAMED', groupe: '', tel: '0671614828', adresse: '', code_panique: '126', poste: '', cin: '566655', date_naissance: '1969-03-20', matricule: 'S0243C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    
    { code: 'L5B', nom: 'BELAHMAR', prenom: 'MOHAMED', groupe: 'B', tel: '0676120413', adresse: '', code_panique: '913', poste: 'L5A', cin: 'A20765', date_naissance: '1988-11-09', matricule: 'S11645C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    { code: 'L6B', nom: 'RACHAD', prenom: 'YOUSSEF', groupe: 'B', tel: '0608980660', adresse: '', code_panique: '841', poste: 'L6A', cin: 'D152284', date_naissance: '1986-09-10', matricule: 'S09167C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    { code: 'L7B', nom: 'ANOUAR', prenom: 'KADDAR', groupe: 'B', tel: '0610425223', adresse: '', code_panique: '327', poste: 'L7A', cin: 'B155974', date_naissance: '1975-06-10', matricule: 'S09161C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    { code: 'L8B', nom: 'AHMED', prenom: 'OUHADI', groupe: 'B', tel: '0670469944', adresse: '', code_panique: '815', poste: 'L8', cin: 'FL74690', date_naissance: '1968-01-01', matricule: 'S11697C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    { code: 'L9B', nom: 'BOUZIANE', prenom: 'EL HAMROUCHI', groupe: 'B', tel: '0662765085', adresse: '', code_panique: '914', poste: 'L9', cin: 'H207682', date_naissance: '2005-05-24', matricule: 'S12668C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    { code: 'L10B', nom: 'ABDELHAK', prenom: 'AKRAOUI', groupe: 'B', tel: '0660387282', adresse: '', code_panique: '926', poste: 'L10', cin: 'AD57067', date_naissance: '1977-01-01', matricule: 'S09382C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    { code: 'L11B', nom: 'NOUASSI', prenom: 'AHMED', groupe: 'B', tel: '0666276247', adresse: '', code_panique: '125', poste: 'L11A', cin: '319132', date_naissance: '1968-01-11', matricule: 'S09211C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    { code: 'L13B', nom: 'DAOU', prenom: 'RACHID', groupe: 'B', tel: '0677772015', adresse: '', code_panique: '118', poste: 'L13', cin: 'X127977', date_naissance: '1970-08-01', matricule: 'S09253C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    { code: 'L14B', nom: 'ABDELGHANI', prenom: 'KANOUBI', groupe: 'B', tel: '0606656164', adresse: '', code_panique: '858', poste: 'L14A', cin: '752774', date_naissance: '1970-11-28', matricule: 'S12670C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    { code: 'L15B', nom: 'BOUTJADIR', prenom: 'HAMZA', groupe: 'B', tel: '0615183020', adresse: '', code_panique: '999', poste: 'L15A', cin: 'A40770', date_naissance: '1987-06-30', matricule: 'S09423C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    { code: 'L16B', nom: 'NOUREDDINE', prenom: 'TAOUZI', groupe: 'B', tel: '0767872200', adresse: '', code_panique: '328', poste: 'L16A', cin: '414286', date_naissance: '1970-08-04', matricule: 'S09169C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    { code: 'L18B', nom: 'ABDELAZIZ', prenom: 'SAKANI', groupe: 'B', tel: '0662509676', adresse: '', code_panique: '826', poste: 'L18', cin: 'Z428454', date_naissance: '1986-01-10', matricule: 'S13153C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    { code: 'L20B', nom: 'RACHAKHA', prenom: 'SAID', groupe: 'B', tel: '0648758364', adresse: '', code_panique: '922', poste: 'L 20', cin: '', date_naissance: '', matricule: '', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    { code: 'ZB', nom: 'SNAIDA', prenom: 'AHMED', groupe: 'B', tel: '0666362689', adresse: '', code_panique: '815', poste: 'ZX', cin: 'A24831', date_naissance: '1974-05-25', matricule: 'S09195C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    
    { code: 'I2B', nom: 'rtAHI', prenom: 'MOHAED', groupe: 'B', tel: '06614828', adresse: '', code_panique: '12', poste: 'I 2', cin: '566655', date_naissance: '1969-03-20', matricule: 'S09293C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    // Groupe C
    { code: 'CPC', nom: 'ABDELHAK', prenom: 'BERRIMA', groupe: 'C', tel: '0660337343', adresse: '', code_panique: '854', poste: 'CPA', cin: '403963', date_naissance: '1967-02-24', matricule: 'S09271C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    { code: 'CONC', nom: 'NOUR', prenom: 'HICHAM', groupe: 'C', tel: '0665484503', adresse: '', code_panique: 'DP1400', poste: 'CON', cin: 'A714632', date_naissance: '1982-02-03', matricule: 'S09174C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    { code: 'MOTC', nom: 'IDRISS', prenom: 'IDRISSI', groupe: 'C', tel: '0667999548', adresse: '', code_panique: 'DP1400', poste: 'MOT', cin: 'AB171068', date_naissance: '1972-12-24', matricule: 'S09276C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    { code: 'Z6C', nom: 'HARBIL', prenom: 'ANASS', groupe: 'C', tel: '0669001099', adresse: '', code_panique: 'DP1400', poste: 'z6A', cin: '434690', date_naissance: '1984-02-26', matricule: 'S09153C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    { code: 'Z2C', nom: 'GRINEH', prenom: 'KHALID', groupe: 'C', tel: '', adresse: '', code_panique: 'DP1400', poste: 'Z2A', cin: '670880', date_naissance: '1976-09-29', matricule: 'S09176C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    { code: 'Z5C', nom: 'MULouANI', prenom: 'MUSTAPHA', groupe: 'C', tel: '0661970781', adresse: '', code_panique: 'DP1400', poste: 'Z5', cin: 'AB96201', date_naissance: '1969-11-18', matricule: 'S09165C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    { code: 'O1aC', nom: 'JAOUAD', prenom: 'ELKERRAOUI', groupe: 'C', tel: '', adresse: '', code_panique: '913', poste: 'O1a', cin: 'A471219', date_naissance: '1973-10-21', matricule: 'S09184C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    { code: 'O1bC', nom: 'AZIZ', prenom: 'CHOUKAIRI', groupe: 'C', tel: '0637014737', adresse: '', code_panique: '228', poste: 'O1b', cin: '', date_naissance: '1966-04-22', matricule: 'S09196C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    { code: 'O3C', nom: 'YOUNESS', prenom: 'MAKAN', groupe: 'C', tel: '0624125461', adresse: '', code_panique: '511', poste: 'O3A', cin: '0704268', date_naissance: '1977-07-03', matricule: 'S09262C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    { code: 'O4C', nom: 'BRAHIM', prenom: 'HMIJAN', groupe: 'C', tel: '0678490326', adresse: '', code_panique: '313', poste: 'O4', cin: '', date_naissance: '1985-04-18', matricule: 'S09214C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    { code: 'O5C', nom: 'YOUSSEF', prenom: 'ATTOUMI', groupe: 'C', tel: '0676800556', adresse: '', code_panique: '848', poste: 'O5', cin: 'QA28049', date_naissance: '1970-03-20', matricule: 'S09263C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    { code: 'O8C', nom: 'TOUFIQ', prenom: 'TAOUFIKI', groupe: 'C', tel: '0656935477', adresse: '', code_panique: '824', poste: 'O8', cin: 'BE584375', date_naissance: '1971-08-01', matricule: 'S09249C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    { code: 'O9C', nom: 'MOHAMED', prenom: 'ELYOUSSFI', groupe: 'C', tel: '06666624637', adresse: '', code_panique: '813', poste: 'O9', cin: 'D148238', date_naissance: '1985-02-05', matricule: 'S09217C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    { code: 'O10C', nom: 'MOHAMED', prenom: 'KHTIDAK', groupe: 'C', tel: '0661564216', adresse: '', code_panique: '911', poste: 'O10', cin: 'A315369', date_naissance: '1966-09-14', matricule: 'S09270C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    { code: 'O11C', nom: 'MUSTAPHA', prenom: 'ARIBATE', groupe: 'C', tel: '0660413159', adresse: '', code_panique: '326', poste: 'O11A', cin: '755764', date_naissance: '1973-12-21', matricule: 'S09178C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    { code: 'O13C', nom: 'HAMID', prenom: 'SAIB', groupe: 'C', tel: '0642234491', adresse: '', code_panique: '826', poste: 'O13', cin: 'AB812110', date_naissance: '1984-06-30', matricule: 'S09168C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    { code: 'O14C', nom: 'RACHID', prenom: 'ALOUI', groupe: 'C', tel: '0675660099', adresse: '', code_panique: '838', poste: 'O14A', cin: 'AB192453', date_naissance: '1972-06-30', matricule: 'S09252C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
     { code: 'O15C', nom: 'YOUSSEF', prenom: 'ZOURAKI', groupe: 'C', tel: '0663868378', adresse: '', code_panique: '113', poste: 'O15A', cin: 'A441336', date_naissance: '1992-03-12', matricule: 'S09171C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    { code: 'O16C', nom: 'ENNABAL', prenom: 'AZOUZ', groupe: 'C', tel: '0698853826', adresse: '', code_panique: '827', poste: 'O16A', cin: '566483', date_naissance: '1967-01-04', matricule: 'S09291C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
       { code: 'L1C', nom: 'dfgAHI', prenom: 'MOHAMED', groupe: 'C', tel: '061614828', adresse: '', code_panique: '126', poste: 'L1', cin: '566655', date_naissance: '1969-03-20', matricule: 'S09243C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' }, 
    { code: 'L2C', nom: 'ELHILALI', prenom: 'AKRAM', groupe: 'C', tel: '0662665394', adresse: '', code_panique: '126', poste: 'L 2', cin: '427172', date_naissance: '1976-01-26', matricule: 'S12073C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    { code: 'L4C', nom: 'RACHID', prenom: 'MAGHAT', groupe: 'C', tel: '', adresse: '', code_panique: '842', poste: 'L4', cin: '', date_naissance: '', matricule: '', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    { code: 'L5C', nom: 'ABDERRAHIL', prenom: 'FAKUHI', groupe: 'C', tel: '0662665394', adresse: '', code_panique: '126', poste: 'L 2', cin: '427172', date_naissance: '1976-01-26', matricule: 'S12073C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    { code: 'L6C', nom: 'RACHID', prenom: 'NOUR', groupe: 'C', tel: '0662665394', adresse: '', code_panique: '126', poste: 'L 2A', cin: '427172', date_naissance: '1976-01-26', matricule: 'S12073C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    { code: 'L7C', nom: 'MOHAMED', prenom: 'NAZIR', groupe: 'C', tel: '0662665394', adresse: '', code_panique: '126', poste: 'L 2A', cin: '427172', date_naissance: '1976-01-26', matricule: 'S12073C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    { code: 'L8C', nom: 'HASSAN', prenom: 'ASSLOUH', groupe: 'C', tel: '0662665394', adresse: '', code_panique: '126', poste: 'L 2A', cin: '427172', date_naissance: '1976-01-26', matricule: 'S12073C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    { code: 'L9C', nom: 'IKHLOUFEN', prenom: 'MOUNIR', groupe: 'C', tel: '0762695160', adresse: '', code_panique: '914', poste: 'L9A', cin: 'E234817', date_naissance: '1996-06-17', matricule: 'S12075C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
      { code: 'L10C', nom: 'DRISS', prenom: 'BENGHANMI', groupe: 'C', tel: '0660201164', adresse: '', code_panique: '926', poste: 'L10', cin: 'AB532578', date_naissance: '1986-01-01', matricule: 'S12131C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    { code: 'L11C', nom: 'LARBI', prenom: 'LKWISSI', groupe: 'C', tel: '0662382842', adresse: '', code_panique: '125', poste: 'L11', cin: 'MC13001', date_naissance: '1980-07-03', matricule: 'S09233C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    { code: 'L13C', nom: 'ABDELLAH', prenom: 'TABTI', groupe: 'C', tel: '0663229985', adresse: '', code_panique: '118', poste: 'L13', cin: 'AD56680', date_naissance: '1979-01-01', matricule: 'S09194C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    { code: 'L14C', nom: 'ABDEMOUNIM', prenom: 'MNAM', groupe: 'C', tel: '0664914374', adresse: '', code_panique: '858', poste: 'L14A', cin: '727413', date_naissance: '1977-11-04', matricule: 'S09203C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    { code: 'L15C', nom: 'TOUFIK', prenom: 'ALHAFID', groupe: 'C', tel: '0662888444', adresse: '', code_panique: '999', poste: 'L15A', cin: 'B197016', date_naissance: '1975-02-04', matricule: 'S09260C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    { code: 'L16C', nom: 'AZIZ', prenom: 'ELALOUSSI', groupe: 'C', tel: '0661098728', adresse: '', code_panique: '328', poste: 'L16', cin: 'Z428454', date_naissance: '', matricule: '', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    { code: 'L20C', nom: 'FARASSI', prenom: 'KARIM', groupe: 'C', tel: '0635419761', adresse: '', code_panique: '922', poste: 'L 20', cin: '', date_naissance: '', matricule: '', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    { code: 'L18C', nom: 'AB', prenom: 'I', groupe: 'C', tel: '0662509676', adresse: '', code_panique: '826', poste: 'L18', cin: 'A203082', date_naissance: '1988-03-10', matricule: 'E', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    { code: 'I2C', nom: 'yuiAHI', prenom: 'MOHAMED', groupe: 'C', tel: '0671614828', adresse: '', code_panique: '126', poste: 'I2', cin: '566655', date_naissance: '1969-03-20', matricule: 'S09243C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
      // Groupe D
    { code: 'CPD', nom: 'mouhcine', prenom: 'YAGOUB', groupe: 'D', tel: '0660336995', adresse: '', code_panique: '854', poste: 'CPA', cin: '0408930', date_naissance: '1966-05-17', matricule: 'S09272C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    { code: 'COND', nom: 'HOUSSAIN', prenom: 'ALAHYANE', groupe: 'D', tel: '0668191854', adresse: '', code_panique: 'DP1400', poste: 'CON', cin: 'JB49050', date_naissance: '1966-01-01', matricule: 'S09280C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    { code: 'MOTD', nom: 'LAHCEN', prenom: 'ALAMI', groupe: 'D', tel: '0666195501', adresse: '', code_panique: 'DP1400', poste: 'MOT', cin: 'UA97962', date_naissance: '1967-06-24', matricule: 'S09277C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    { code: 'ZD', nom: 'MOULZY', prenom: 'mehdi', groupe: 'D', tel: '0665233677', adresse: '', code_panique: '815', poste: 'Z', cin: 'AB47887', date_naissance: '1968-01-15', matricule: 'S09268C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    { code: 'Z2D', nom: 'MUSTAPHA', prenom: 'BOUTSON', groupe: 'D', tel: '', adresse: '', code_panique: 'DP1400', poste: 'Z2A', cin: '692457', date_naissance: '1980-02-14', matricule: 'S09290C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    { code: 'Z5D', nom: 'AYOUB', prenom: 'MAHDAD', groupe: 'D', tel: '0682153784', adresse: '', code_panique: 'DP1400', poste: 'Z5', cin: 'AD210108', date_naissance: '1990-03-23', matricule: 'S11995C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    { code: 'Z6D', nom: 'ABDELHAQ', prenom: 'ZEROUAL', groupe: 'D', tel: '0605119496', adresse: '', code_panique: 'DP1400', poste: 'z6', cin: 'I495670', date_naissance: '1979-08-13', matricule: 'S09205C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    { code: 'O1aD', nom: 'IMAD', prenom: 'BEN KHADRA', groupe: 'D', tel: '0682153784', adresse: '', code_panique: '913', poste: 'O1a', cin: 'AB624802', date_naissance: '1987-02-12', matricule: 'S12674C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    { code: 'O1bD', nom: 'KHLIFI', prenom: 'HADARBACH', groupe: 'D', tel: '0670059528', adresse: '', code_panique: '228', poste: 'O1b', cin: 'UA95212', date_naissance: '1968-04-22', matricule: 'S09190C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    { code: 'O3D', nom: 'YAHYA', prenom: 'ABARKAN', groupe: 'D', tel: '0650651681', adresse: '', code_panique: '511', poste: 'O3A', cin: '632213', date_naissance: '1976-12-15', matricule: 'S09261C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    { code: 'O4D', nom: 'MOHAMED', prenom: 'KABDANI', groupe: 'D', tel: '0611658102', adresse: '', code_panique: '313', poste: 'O4', cin: '427567', date_naissance: '1976-03-28', matricule: 'S09240C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    { code: 'O8D', nom: 'LAHCEN', prenom: 'EL KABOURI', groupe: 'D', tel: '0663754454', adresse: '', code_panique: '824', poste: 'O8', cin: '0365454', date_naissance: '1979-07-14', matricule: 'S09230C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    { code: 'O9D', nom: 'HAKIM', prenom: 'HADDIR', groupe: 'D', tel: '0677522349', adresse: '', code_panique: '813', poste: 'O9', cin: 'D217181', date_naissance: '1990-06-23', matricule: 'S09158C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    { code: 'O10D', nom: 'ADIL', prenom: 'LOURIGHI', groupe: 'D', tel: '0652869687', adresse: '', code_panique: '911', poste: 'O10', cin: 'A742130', date_naissance: '1994-02-19', matricule: 'S12133C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    { code: 'O11D', nom: 'TOUFIK', prenom: 'HAJJI', groupe: 'D', tel: '0660024350', adresse: '', code_panique: '326', poste: 'O11A', cin: '679901', date_naissance: '1983-08-15', matricule: 'S09258C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    { code: 'O12D', nom: 'HASSAN', prenom: 'TOUNSSI', groupe: 'D', tel: '0668928626', adresse: '', code_panique: '855', poste: 'O12A', cin: '194910', date_naissance: '1962-07-01', matricule: 'S09223C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    { code: 'O13D', nom: 'HASSAN', prenom: 'CHAMI', groupe: 'D', tel: '0622564794', adresse: '', code_panique: '826', poste: 'O13', cin: '', date_naissance: '1966-01-01', matricule: 'S09215C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    { code: 'O14D', nom: 'MUSTAPHA', prenom: 'OUGHIL', groupe: 'D', tel: '0677651378', adresse: '', code_panique: '838', poste: 'O14', cin: 'D523912', date_naissance: '1979-02-12', matricule: 'S09248C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    { code: 'O15D', nom: 'ABDERAHIM', prenom: 'MACHHAB', groupe: 'D', tel: '0668272975', adresse: '', code_panique: '113', poste: 'O15', cin: 'E505332', date_naissance: '1974-07-03', matricule: 'S09164C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    { code: 'O16D', nom: 'BOULDGAG', prenom: 'D', groupe: 'D', tel: '0670357654', adresse: '', code_panique: '827', poste: 'O16', cin: 'D388632', date_naissance: '1968-01-01', matricule: 'S09191C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
        { code: 'L1D', nom: 'ZAzrrHI', prenom: 'MOHAMED', groupe: 'D', tel: '0671614828', adresse: '', code_panique: '16', poste: 'L1', cin: '566655', date_naissance: '1969-03-20', matricule: 'S09243C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    { code: 'L2D', nom: 'MOLAY AHMED', prenom: 'HANSALI', groupe: 'D', tel: '', adresse: '', code_panique: '126', poste: 'L 2', cin: 'I196324', date_naissance: '1967-10-01', matricule: 'S12671C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    { code: 'L4D', nom: 'ABDELJALIL', prenom: 'ERRAISSY', groupe: 'D', tel: '', adresse: '', code_panique: '842', poste: 'L4', cin: 'JC337475', date_naissance: '', matricule: 'S13885C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    { code: 'L5D', nom: 'MOHMED', prenom: 'EL AISSAOUI', groupe: 'D', tel: '0666904691', adresse: '', code_panique: '913', poste: 'L5', cin: 'AB26585', date_naissance: '1962-06-30', matricule: 'S09238C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    { code: 'L6D', nom: 'MAJID', prenom: 'SIYADI', groupe: 'D', tel: '0664619176', adresse: '', code_panique: '841', poste: 'L6', cin: 'BK11512', date_naissance: '1962-08-06', matricule: 'S09201C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    { code: 'L7D', nom: 'HASSAN', prenom: 'AIT BOURI', groupe: 'D', tel: '0641103141', adresse: '', code_panique: '327', poste: 'L7A', cin: '406039', date_naissance: '1966-02-11', matricule: 'S09219C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    { code: 'L9D', nom: 'KARIM', prenom: 'MEROURI', groupe: 'D', tel: '0639284992', adresse: '', code_panique: '914', poste: 'L9', cin: 'AB11225', date_naissance: '', matricule: 'S15251C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    { code: 'L10D', nom: 'MOHAMED', prenom: 'DAHANI', groupe: 'D', tel: '0608246402', adresse: '', code_panique: '926', poste: 'L10A', cin: '756477', date_naissance: '1974-03-07', matricule: 'S09237C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    { code: 'L11D', nom: 'MOHAMED', prenom: 'LACHGAR', groupe: 'D', tel: '0662721021', adresse: '', code_panique: '125', poste: 'L11A', cin: 'AB122686', date_naissance: '1968-03-17', matricule: 'S09189C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    { code: 'L13D', nom: 'HICHAM', prenom: 'EL HILALI', groupe: 'D', tel: '0649835024', adresse: '', code_panique: '118', poste: 'L13', cin: 'AD35116', date_naissance: '1973-02-02', matricule: 'S09224C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    { code: 'L14D', nom: 'MOHAMED', prenom: 'ELHARBI', groupe: 'D', tel: '0613535275', adresse: '', code_panique: '858', poste: 'L14A', cin: 'AB208044', date_naissance: '1978-08-05', matricule: 'S09245C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    { code: 'L15D', nom: 'JALAL', prenom: 'DAHBI', groupe: 'D', tel: '0672792404', adresse: '', code_panique: '999', poste: 'L15A', cin: '768009', date_naissance: '1976-12-05', matricule: 'S09226C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    { code: 'L16D', nom: 'RACHID', prenom: 'JABAL', groupe: 'D', tel: '0628612647', adresse: '', code_panique: '328', poste: 'L16A', cin: '786241', date_naissance: '1979-08-01', matricule: 'S09255C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    { code: 'L18D', nom: 'MOHAMED', prenom: 'GUARMA', groupe: 'D', tel: '0699082100', adresse: '', code_panique: '826', poste: 'L18', cin: 'AD200164', date_naissance: '1987-02-20', matricule: 'S12074C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    { code: 'L20D', nom: 'BRAHIM', prenom: 'SATANI', groupe: 'D', tel: '0660082965', adresse: '', code_panique: '922', poste: 'L 20', cin: '', date_naissance: '', matricule: '', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    { code: 'I2A', nom: '..DGSLLEM', prenom: 'K .ID', groupe: 'A', tel: '0715929737', adresse: '', code_panique: '126', poste: 'I2', cin: '653628', date_naissance: '1970-07-29', matricule: 'S09U166C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
      // Groupe E
    { code: 'ACCA', nom: 'CHAJAI', prenom: 'SOUKAINA', groupe: 'E', tel: '', adresse: '', code_panique: 'non', poste: 'D.U.E', cin: '', date_naissance: '', matricule: '', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    { code: 'ACCB', nom: 'MAAROUF', prenom: 'NAJAT', groupe: 'E', tel: '', adresse: '', code_panique: 'non', poste: 'D.U.E', cin: 'AD223954', date_naissance: '1991-12-06', matricule: 'S10100C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    { code: 'Z1A', nom: 'FARROUCHE', prenom: 'MILOUD', groupe: 'E', tel: '', adresse: '', code_panique: 'dp1400', poste: 'D.U.E', cin: 'AA31133', date_naissance: '1987-11-05', matricule: 'S09286C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    { code: 'Z1B', nom: 'KHIAR', prenom: 'NOUREDDINE', groupe: 'E', tel: '', adresse: '', code_panique: 'dp1401', poste: 'D.U.E', cin: 'h705007', date_naissance: '1991-09-09', matricule: 'S12664C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    { code: 'Z4A', nom: 'ECHALLI', prenom: 'KASSEM', groupe: 'E', tel: '', adresse: '', code_panique: 'dp1402', poste: 'D.U.E', cin: 'A724455', date_naissance: '1985-08-01', matricule: 'S12665C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    { code: 'Z4B', nom: 'OUHADI', prenom: 'LAHCEN', groupe: 'E', tel: '', adresse: '', code_panique: 'dp1403', poste: 'D.U.E', cin: 'U99650', date_naissance: '1973-08-12', matricule: 'S09992C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    { code: 'Z4C', nom: 'ELFAKHAR', prenom: 'MOHAMED', groupe: 'E', tel: '', adresse: '', code_panique: 'dp1404', poste: 'D.U.E', cin: 'A737428', date_naissance: '1983-07-03', matricule: 'S09285C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    { code: 'Z4D', nom: 'TAOUIL', prenom: 'KHALID', groupe: 'E', tel: '', adresse: '', code_panique: 'dp1405', poste: 'D.U.E', cin: 'AD154017', date_naissance: '1988-03-09', matricule: 'S10666C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    { code: 'PR', nom: 'OUNASSE', prenom: 'NAWFAL', groupe: 'E', tel: '', adresse: 'C.T.R', code_panique: '', poste: '', cin: '', date_naissance: '', matricule: '', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    { code: 'I2D', nom: 'ZopiAHI', prenom: 'MOHAMED', groupe: 'D', tel: '0671614828', adresse: '', code_panique: '126', poste: 'I2', cin: '566655', date_naissance: '1969-03-20', matricule: 'S09243C', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
     // Anciens / divers
    { code: 'O4B', nom: 'ANQACH HASSAN', prenom: 'HASSAN', groupe: 'B', tel: '', adresse: '313', code_panique: '', poste: 'O4', cin: 'non', date_naissance: '1962-04-09', matricule: 'RETRAITE', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    { code: 'O5A', nom: 'LEKHEL', prenom: 'RACHID', groupe: 'A', tel: '0644734747', adresse: '', code_panique: '848', poste: 'O5', cin: 'non', date_naissance: '1962-12-04', matricule: 'RETRAITE', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    { code: 'O14A', nom: 'EL KHAOUI', prenom: 'ABDELTIF', groupe: 'A', tel: '0670768055', adresse: '', code_panique: '838', poste: 'O14', cin: 'non', date_naissance: '1961-04-25', matricule: 'RETRAITE', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    { code: 'L10A', nom: 'AMHZOUL', prenom: 'MUSTAPHA', groupe: 'A', tel: '0707331929', adresse: '', code_panique: '926', poste: 'L10', cin: '', date_naissance: '1961-09-28', matricule: 'RETRAITE', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    { code: 'O12C', nom: 'AZERFI', prenom: 'SAID', groupe: 'C', tel: '0672499982', adresse: '', code_panique: '855', poste: 'O12', cin: '', date_naissance: '1961-06-30', matricule: 'RETRAITE', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
    { code: 'O5D', nom: 'FERZOUI', prenom: 'KHALED', groupe: 'D', tel: '0676745704', adresse: '', code_panique: '848', poste: 'O5', cin: '', date_naissance: '1962-01-01', matricule: 'RETRAITE', date_entree: '2025-11-01', date_sortie: '2025-01-01', statut: 'actif' },
    { code: 'L8D', nom: 'BOUTOU', prenom: 'MOHAMED', groupe: 'D', tel: '0670181844', adresse: '', code_panique: '815', poste: 'L8', cin: '', date_naissance: '1961-06-30', matricule: 'RETRAITE', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
        // === EXEMPLE : AJOUTEZ VOS PROPRES AGENTS ICI ===
        
        { code: 'JOK1', nom: 'Joker', prenom: 'Un', groupe: 'J', tel: '', adresse: '', code_panique: '', poste: 'Joker', cin: '', date_naissance: '', matricule: '', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
        { code: 'JOK2', nom: 'Joker', prenom: 'Deux', groupe: 'J', tel: '', adresse: '', code_panique: '', poste: 'Joker', cin: '', date_naissance: '', matricule: '', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' },
        { code: 'TEST', nom: 'Test', prenom: 'Agent', groupe: 'A', tel: '0600000000', adresse: '', code_panique: '', poste: 'Test', cin: '', date_naissance: '', matricule: '', date_entree: '2025-11-01', date_sortie: null, statut: 'actif' }
    ];
    initializeHolidays();
    saveData();
}

function initializeHolidays() {
    holidays = [
        { date: "01-01", description: "Nouvel An", type: "fixe", isRecurring: true },
        { date: "01-11", description: "Manifeste de l'Indépendance", type: "fixe", isRecurring: true },
        { date: "05-01", description: "Fête du Travail", type: "fixe", isRecurring: true },
        { date: "07-30", description: "Fête du Trône", type: "fixe", isRecurring: true },
        { date: "08-14", description: "Allégeance Oued Eddahab", type: "fixe", isRecurring: true },
        { date: "08-20", description: "Révolution du Roi et du Peuple", type: "fixe", isRecurring: true },
        { date: "08-21", description: "Fête de la Jeunesse", type: "fixe", isRecurring: true },
        { date: "11-06", description: "Marche Verte", type: "fixe", isRecurring: true },
        { date: "11-18", description: "Fête de l'Indépendance", type: "fixe", isRecurring: true }
    ];
}

// ==================== FONCTIONS UTILITAIRES ====================

function getMonthName(month) { return MOIS_FRANCAIS[month - 1] || ''; }

function isHolidayDate(date) {
    const monthDay = `${(date.getMonth()+1).toString().padStart(2,'0')}-${date.getDate().toString().padStart(2,'0')}`;
    return holidays.some(h => h.isRecurring && h.date === monthDay);
}

function getTheoreticalShiftWithoutAbsence(agentCode, dateStr) {
    const agent = agents.find(a => a.code === agentCode);
    if (!agent || agent.statut !== 'actif') return '-';
    const date = new Date(dateStr);
    const group = agent.groupe;
    if (group === 'J') return 'R';
    if (group === 'E') {
        const dayOfWeek = date.getDay();
        if (dayOfWeek === 0 || dayOfWeek === 6) return 'R';
        return date.getDate() % 2 === 0 ? '1' : '2';
    }
    const daysSinceStart = Math.floor((date - DATE_AFFECTATION_BASE) / (1000 * 60 * 60 * 24));
    const groupOffset = { 'A': 0, 'B': 2, 'C': 4, 'D': 6 }[group] || 0;
    let cycleDay = (daysSinceStart + groupOffset) % 8;
    if (cycleDay < 0) cycleDay += 8;
    if (cycleDay < 2) return '1';
    if (cycleDay < 4) return '2';
    if (cycleDay < 6) return '3';
    return 'R';
}

function getAvailableJokersList(dateStr) {
    const usedJokers = jokerAssignments[dateStr] || new Set();
    const jokers = agents.filter(a => a.groupe === 'J' && a.statut === 'actif');
    return jokers.filter(j => {
        const monthKey = dateStr.substring(0,7);
        const jokerAbsence = planningData[monthKey]?.[j.code]?.[dateStr];
        if (jokerAbsence && ['C','M','A'].includes(jokerAbsence.shift)) return false;
        if (usedJokers.has(j.code)) return false;
        const theoretical = getTheoreticalShiftWithoutAbsence(j.code, dateStr);
        if (theoretical !== 'R') return false;
        const existing = planningData[monthKey]?.[j.code]?.[dateStr];
        if (existing && existing.type === 'remplacement_joker') return false;
        return true;
    });
}

async function promptJokerChoice(agentCode, dateStr, absenceType) {
    const available = getAvailableJokersList(dateStr);
    if (available.length === 0) {
        const msg = `Aucun joker disponible le ${dateStr}. Voulez-vous enregistrer l'absence sans remplacement ?`;
        if (confirm(msg)) return null;
        else return 'CANCEL';
    }
    const options = available.map(j => `${j.code} (${j.nom} ${j.prenom})`).join(', ');
    const choice = prompt(`Choix du joker pour remplacer ${agentCode} le ${dateStr} (type: ${absenceType})\nJokers disponibles: ${options}\nEntrez le code du joker (ex: JOK1) ou laissez vide pour aucun :`);
    if (!choice) return null;
    const selected = available.find(j => j.code === choice.toUpperCase());
    if (selected) return selected.code;
    alert("Code invalide ou joker non disponible. Réessayez.");
    return promptJokerChoice(agentCode, dateStr, absenceType);
}

function findJokerForDate(agentCode, dateStr) {
    const monthKey = dateStr.substring(0,7);
    const data = planningData[monthKey];
    if (!data) return null;
    for (let jokerCode of Object.keys(data)) {
        const entry = data[jokerCode]?.[dateStr];
        if (entry && entry.type === 'remplacement_joker' && entry.comment && entry.comment.includes(agentCode)) {
            return jokerCode;
        }
    }
    return null;
}

function getShiftForAgent(agentCode, dateStr) {
    const monthKey = dateStr.substring(0, 7);
    const existing = planningData[monthKey]?.[agentCode]?.[dateStr];
    const agent = agents.find(a => a.code === agentCode);
    if (existing && ['C', 'M', 'A'].includes(existing.shift) && agent && agent.groupe !== 'J') {
        return existing.shift;
    }
    if (existing) return existing.shift;
    if (!agent || agent.statut !== 'actif') return '-';
    if (agent.groupe === 'J') return 'R';
    return getTheoreticalShiftWithoutAbsence(agentCode, dateStr);
}

function countEffectiveHolidaysForAgent(agentCode, month, year) {
    const agent = agents.find(a => a.code === agentCode);
    const isGroupE = agent && agent.groupe === 'E';
    let count = 0;
    const daysInMonth = new Date(year, month, 0).getDate();
    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month-1, day);
        if (isHolidayDate(date)) {
            if (isGroupE) count++;
            else {
                const dateStr = `${year}-${month.toString().padStart(2,'0')}-${day.toString().padStart(2,'0')}`;
                const shift = getShiftForAgent(agentCode, dateStr);
                if (!['R', 'M', 'A'].includes(shift)) count++;
            }
        }
    }
    return count;
}

function calculateAgentStats(agentCode, month, year) {
    const daysInMonth = new Date(year, month, 0).getDate();
    const stats = { '1':0, '2':0, '3':0, 'R':0, 'C':0, 'M':0, 'A':0, '-':0 };
    for (let day=1; day<=daysInMonth; day++) {
        const dateStr = `${year}-${month.toString().padStart(2,'0')}-${day.toString().padStart(2,'0')}`;
        const shift = getShiftForAgent(agentCode, dateStr);
        if (stats[shift] !== undefined) stats[shift]++;
    }
    const totalTravailles = stats['1']+stats['2']+stats['3'];
    const totalFeries = countEffectiveHolidaysForAgent(agentCode, month, year);
    const totalConges = stats['C'];
    const totalGeneral = totalTravailles + totalFeries + totalConges;
    return [
        { label: 'Matin (1)', value: stats['1'] },
        { label: 'Après-midi (2)', value: stats['2'] },
        { label: 'Nuit (3)', value: stats['3'] },
        { label: 'Repos (R)', value: stats['R'] },
        { label: 'Congés (C)', value: stats['C'] },
        { label: 'Maladie (M)', value: stats['M'] },
        { label: 'Autre absence (A)', value: stats['A'] },
        { label: 'Jours fériés', value: totalFeries },
        { label: 'Total travaillés', value: totalTravailles },
        { label: 'Total général', value: totalGeneral }
    ];
}

function openPopup(title, body, footer) {
    const overlay = document.getElementById('overlay');
    const content = document.getElementById('popup-content');
    content.innerHTML = `
        <div class="popup-header"><h2>${title}</h2><button class="popup-close-btn" onclick="closePopup()">&times;</button></div>
        <div class="popup-body">${body}</div>
        <div class="popup-footer">${footer}</div>
    `;
    overlay.classList.add('visible');
}

function closePopup() { document.getElementById('overlay').classList.remove('visible'); }

function showSnackbar(msg) {
    const snackbar = document.createElement('div');
    snackbar.id = 'snackbar';
    snackbar.textContent = msg;
    snackbar.style.cssText = `
        visibility: visible; min-width: 250px; margin-left: -125px; background-color: #333; color: #fff;
        text-align: center; border-radius: 8px; padding: 16px; position: fixed; z-index: 3000;
        left: 50%; bottom: 30px; font-size: 0.9em; box-shadow: 0 4px 8px rgba(0,0,0,0.3);
    `;
    document.body.appendChild(snackbar);
    setTimeout(() => {
        snackbar.style.animation = 'fadeout 0.5s';
        setTimeout(() => snackbar.remove(), 500);
    }, 3000);
}

function downloadCSV(content, filename) {
    const blob = new Blob(["\uFEFF"+content], {type:'text/csv;charset=utf-8;'});
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
    URL.revokeObjectURL(link.href);
}
// ==================== PARTIE 2 : MENU PRINCIPAL, TABLEAU DE BORD, NOTIFICATIONS ====================

function displayMainMenu() {
    const mainContent = document.getElementById('main-content');
    document.getElementById('sub-title').textContent = "Tableau de bord";
    mainContent.innerHTML = '';

    const today = new Date().toISOString().split('T')[0];
    const todayAbsences = [];
    for (let monthKey in planningData) {
        for (let agentCode in planningData[monthKey]) {
            if (planningData[monthKey][agentCode][today]) {
                const entry = planningData[monthKey][agentCode][today];
                if (['C','M','A'].includes(entry.shift)) {
                    const joker = findJokerForDate(agentCode, today);
                    todayAbsences.push({ agent: agentCode, type: entry.shift, joker });
                }
            }
        }
    }
    const actifsCount = agents.filter(a => a.statut === 'actif').length;
    const jokersCount = agents.filter(a => a.groupe === 'J' && a.statut === 'actif').length;
    const unreadNotifs = replacementNotifications.filter(n => !n.lu).length;

    const dashboardHTML = `
        <div class="dashboard">
            <div class="dashboard-cards">
                <div class="card"><h3>👥 Agents actifs</h3><div class="card-value">${actifsCount}</div></div>
                <div class="card"><h3>🤖 Jokers disponibles</h3><div class="card-value">${jokersCount}</div></div>
                <div class="card"><h3>🔔 Notifications</h3><div class="card-value">${unreadNotifs}</div></div>
                <div class="card"><h3>📅 Absences aujourd'hui</h3><div class="card-value">${todayAbsences.length}</div></div>
            </div>
            <div class="dashboard-section">
                <h3>📋 Absences du jour</h3>
                ${todayAbsences.length ? `
                    <table class="classement-table">
                        <thead><tr><th>Agent</th><th>Type</th><th>Remplacé par</th></tr></thead>
                        <tbody>${todayAbsences.map(a => `<tr><td>${a.agent}</td><td>${SHIFT_LABELS[a.type]}</td><td>${a.joker || 'Non remplacé'}</td></tr>`).join('')}</tbody>
                    </table>
                ` : '<p>Aucune absence aujourd\'hui.</p>'}
            </div>
            <div class="dashboard-section">
                <h3>🔄 Derniers remplacements (5 derniers)</h3>
                ${replacementNotifications.slice(0,5).map(n => `<div>${new Date(n.date).toLocaleString()} : ${n.joker} remplace ${n.agent_absent} (${n.date_absence})</div>`).join('') || 'Aucun remplacement récent.'}
            </div>
        </div>
        <div class="menu-button-container" style="margin-top: 20px;">
            ${generateMainMenuButtons()}
        </div>
    `;
    mainContent.innerHTML = dashboardHTML;
}

function generateMainMenuButtons() {
    const options = [
        { text: "👥 GESTION DES AGENTS", handler: "displayAgentsManagementMenu", className: "menu-section" },
        { text: "📅 GESTION DU PLANNING", handler: "displayPlanningMenu", className: "menu-section" },
        { text: "📊 STATISTIQUES & CLASSEMENT", handler: "displayStatisticsMenu", className: "menu-section" },
        { text: "🏖️ CONGÉS & ABSENCES", handler: "displayLeavesMenu", className: "menu-section" },
        { text: "🚨 CODES PANIQUE", handler: "displayPanicCodesMenu", className: "menu-section" },
        { text: "📻 GESTION RADIOS", handler: "displayRadiosMenu", className: "menu-section" },
        { text: "👔 HABILLEMENT", handler: "displayUniformMenu", className: "menu-section" },
        { text: "⚠️ AVERTISSEMENTS", handler: "displayWarningsMenu", className: "menu-section" },
        { text: "🎉 JOURS FÉRIÉS", handler: "displayHolidaysMenu", className: "menu-section" },
        { text: "💾 EXPORTATIONS", handler: "displayExportMenu", className: "menu-section" },
        { text: "⚙️ CONFIGURATION", handler: "displayConfigMenu", className: "menu-section" },
        { text: "🔔 NOTIFICATIONS", handler: "showNotificationsList", className: "menu-section" },
        { text: "🚪 QUITTER", handler: "quitApp", className: "quit-button" }
    ];
    return options.map(opt => `<button class="menu-button ${opt.className}" onclick="${opt.handler}()">${opt.text}</button>`).join('');
}

function quitApp() {
    if (confirm("Quitter ?")) { saveData(); window.close(); }
}

function showNotificationsList() {
    const notifs = replacementNotifications;
    if (notifs.length === 0) {
        openPopup("🔔 Notifications", "<p>Aucune notification</p>", `<button class="popup-button gray" onclick="closePopup()">Fermer</button>`);
        return;
    }
    const html = `
        <div class="info-section">
            <h3>Notifications de remplacement</h3>
            <button class="popup-button small blue" onclick="markAllNotificationsRead()">✅ Tout marquer comme lu</button>
            <table class="classement-table">
                <thead><tr><th>Date</th><th>Agent absent</th><th>Joker remplaçant</th><th>Date(s) absence</th><th>Statut</th></tr></thead>
                <tbody>
                    ${notifs.map(n => `
                        <tr>
                            <td>${new Date(n.date).toLocaleString()}</td>
                            <td>${n.agent_absent} (${agents.find(a=>a.code===n.agent_absent)?.nom || ''})</td>
                            <td>${n.joker} (${agents.find(a=>a.code===n.joker)?.nom || ''})</td>
                            <td>${n.date_absence}</td>
                            <td>${n.lu ? '✅ Lu' : '🆕 Non lu'}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
    openPopup("🔔 Notifications", html, `<button class="popup-button gray" onclick="closePopup()">Fermer</button>`);
}

function markAllNotificationsRead() {
    replacementNotifications.forEach(n => n.lu = true);
    saveData();
    showSnackbar("✅ Toutes les notifications marquées comme lues");
    showNotificationsList();
}

function displaySubMenu(title, options) {
    const mainContent = document.getElementById('main-content');
    document.getElementById('sub-title').textContent = title;
    mainContent.innerHTML = '';
    const menuContainer = document.createElement('div');
    menuContainer.className = 'menu-button-container';
    options.forEach(opt => {
        const btn = document.createElement('button');
        btn.textContent = opt.text;
        btn.className = 'menu-button' + (opt.className ? ' ' + opt.className : '');
        btn.onclick = opt.handler;
        menuContainer.appendChild(btn);
    });
    mainContent.appendChild(menuContainer);
}
// ==================== PARTIE 3 : GESTION DES AGENTS ====================

function displayAgentsManagementMenu() {
    displaySubMenu("GESTION DES AGENTS", [
        { text: "📋 Liste des Agents", handler: displayAgentsList },
        { text: "➕ Ajouter un Agent", handler: showAddAgentForm },
        { text: "✏️ Modifier un Agent", handler: showEditAgentList },
        { text: "🗑️ Supprimer un Agent", handler: showDeleteAgentList },
        { text: "📁 Importer Agents (Excel)", handler: showImportExcelForm },
        { text: "📥 Importer Agents (CSV)", handler: showImportCSVForm },
        { text: "🔄 Agents de Test", handler: initializeTestDataWithConfirm },
        { text: "📤 Exporter Agents", handler: exportAgentsData },
        { text: "↩️ Retour Menu Principal", handler: displayMainMenu, className: "back-button" }
    ]);
}

function displayAgentsList() {
    const html = `
        <div class="info-section">
            <div style="display:flex; justify-content:space-between; margin-bottom:15px;">
                <input type="text" id="searchAgent" placeholder="Rechercher..." style="width:70%; padding:10px;" onkeyup="filterAgents()">
                <button class="popup-button blue" onclick="refreshAgentsList()">🔄</button>
            </div>
            <div id="list-container">${generateAgentsTable(agents)}</div>
        </div>
    `;
    openPopup("📋 Liste des Agents", html, `
        <button class="popup-button green" onclick="showAddAgentForm()">➕ Ajouter</button>
        <button class="popup-button gray" onclick="closePopup()">Fermer</button>
    `);
}

function generateAgentsTable(data) {
    if (!data.length) return '<p style="text-align:center;">Aucun agent</p>';
    return `
        <table class="classement-table">
            <thead>
                <tr>
                    <th>Code</th>
                    <th>Nom & Prénom</th>
                    <th>Groupe</th>
                    <th>Statut</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                ${data.map(a => `
                    <tr>
                        <td><strong>${a.code}</strong></td>
                        <td onclick="showAgentDetails('${a.code}')" style="cursor:pointer;">${a.nom} ${a.prenom}</td>
                        <td>${a.groupe}</td>
                        <td><span class="status-badge ${a.statut==='actif'?'active':'inactive'}">${a.statut}</span></td>
                        <td>
                            <button class="action-btn small" onclick="showEditAgentForm('${a.code}')">✏️</button>
                            <button class="action-btn small red" onclick="confirmDeleteAgent('${a.code}')">🗑️</button>
                            <button class="action-btn small blue" onclick="showAgentDetails('${a.code}')">👁️</button>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

function showAgentDetails(code) {
    const a = agents.find(ag => ag.code === code);
    if (!a) return;
    const panic = panicCodes.find(p => p.agent_code === code);
    const radio = radios.find(r => r.attributed_to === code);
    const html = `
        <div class="info-section">
            <h3>Informations</h3>
            <div class="info-item"><span class="info-label">Matricule:</span> ${a.matricule||'N/A'}</div>
            <div class="info-item"><span class="info-label">CIN:</span> ${a.cin||'N/A'}</div>
            <div class="info-item"><span class="info-label">Tél:</span> ${a.tel||'N/A'}</div>
            <div class="info-item"><span class="info-label">Poste:</span> ${a.poste||'N/A'}</div>
            <div class="info-item"><span class="info-label">Entrée:</span> ${a.date_entree||'N/A'}</div>
            <div class="info-item"><span class="info-label">Sortie:</span> ${a.date_sortie||'Actif'}</div>
            <h3>Actions</h3>
            <div style="display:flex; gap:10px; flex-wrap:wrap;">
                <button class="popup-button small blue" onclick="showAgentPlanning('${code}')">📅 Planning</button>
                <button class="popup-button small green" onclick="showAgentStats('${code}')">📊 Stats</button>
                <button class="popup-button small orange" onclick="showAddLeaveForAgent('${code}')">🏖️ Congé</button>
                <button class="popup-button small red" onclick="showPanicForAgent('${code}')">🔴 Panique</button>
                <button class="popup-button small purple" onclick="showRadioForAgent('${code}')">📻 Radio</button>
            </div>
            <h3>Supplémentaires</h3>
            <div class="info-item"><span class="info-label">Code Panique:</span> ${panic ? panic.code : 'Non défini'}</div>
            <div class="info-item"><span class="info-label">Radio:</span> ${radio ? radio.id+' ('+radio.model+')' : 'Non attribuée'}</div>
        </div>
    `;
    openPopup(`👤 ${a.nom} ${a.prenom}`, html, `
        <button class="popup-button green" onclick="showEditAgentForm('${code}')">✏️ Modifier</button>
        <button class="popup-button blue" onclick="displayAgentsList()">📋 Retour liste</button>
        <button class="popup-button gray" onclick="closePopup()">Fermer</button>
    `);
}

function showPanicForAgent(code) {
    const panic = panicCodes.find(p => p.agent_code === code);
    if (panic) showEditPanicCode(code);
    else showAddPanicCodeForm(code);
}

function showRadioForAgent(code) {
    const radio = radios.find(r => r.attributed_to === code);
    if (radio) showReturnRadioForm(radio.id);
    else {
        const available = radios.find(r => r.status === 'DISPONIBLE');
        if (available) showAssignRadioForm(available.id, code);
        else showSnackbar("⚠️ Aucune radio disponible");
    }
}

function showAddAgentForm() {
    const html = `
        <div class="info-section">
            <h3>➕ Ajouter un Agent</h3>
            <form id="addAgentForm" onsubmit="return addNewAgent(event)">
                <div class="form-group"><label>Code *</label><input type="text" id="agentCode" required></div>
                <div class="form-group"><label>Nom *</label><input type="text" id="agentNom" required></div>
                <div class="form-group"><label>Prénom *</label><input type="text" id="agentPrenom" required></div>
                <div class="form-group"><label>Groupe *</label><select id="agentGroupe">
                    <option value="A">A</option><option value="B">B</option><option value="C">C</option>
                    <option value="D">D</option><option value="E">E</option><option value="J">Joker</option>
                </select></div>
                <div class="form-group"><label>Matricule</label><input type="text" id="agentMatricule"></div>
                <div class="form-group"><label>CIN</label><input type="text" id="agentCIN"></div>
                <div class="form-group"><label>Téléphone</label><input type="text" id="agentTel"></div>
                <div class="form-group"><label>Poste</label><input type="text" id="agentPoste"></div>
                <div class="form-group"><label>Date entrée</label><input type="date" id="agentDateEntree" value="${new Date().toISOString().split('T')[0]}"></div>
            </form>
        </div>
    `;
    openPopup("➕ Ajouter Agent", html, `
        <button class="popup-button green" onclick="document.getElementById('addAgentForm').submit()">💾 Enregistrer</button>
        <button class="popup-button gray" onclick="displayAgentsManagementMenu()">Annuler</button>
    `);
}

function addNewAgent(event) {
    event.preventDefault();
    const code = document.getElementById('agentCode').value.toUpperCase();
    const nom = document.getElementById('agentNom').value;
    const prenom = document.getElementById('agentPrenom').value;
    const groupe = document.getElementById('agentGroupe').value;
    if (!code || !nom || !prenom || !groupe) { showSnackbar("⚠️ Champs obligatoires"); return false; }
    if (agents.find(a=>a.code===code)) { showSnackbar(`⚠️ Code ${code} existe déjà`); return false; }
    agents.push({
        code, nom, prenom, groupe,
        matricule: document.getElementById('agentMatricule').value || '',
        cin: document.getElementById('agentCIN').value || '',
        tel: document.getElementById('agentTel').value || '',
        poste: document.getElementById('agentPoste').value || '',
        date_entree: document.getElementById('agentDateEntree').value || new Date().toISOString().split('T')[0],
        date_sortie: null, statut: 'actif'
    });
    saveData();
    showSnackbar(`✅ Agent ${code} ajouté`);
    displayAgentsList();
    closePopup();
    return false;
}

function showEditAgentList() {
    if (!agents.length) { showSnackbar("⚠️ Aucun agent"); return; }
    const html = `
        <div class="info-section">
            <h3>Sélectionner un agent</h3>
            <input type="text" id="searchEditAgent" placeholder="Rechercher..." style="width:100%; margin-bottom:15px;" onkeyup="filterEditAgents()">
            <div id="edit-list-container">${generateEditAgentsList()}</div>
        </div>
    `;
    openPopup("✏️ Modifier Agent", html, `<button class="popup-button gray" onclick="closePopup()">Annuler</button>`);
}

function generateEditAgentsList() {
    return `
        <table class="classement-table">
            <thead>
                <tr>
                    <th>Code</th>
                    <th>Nom & Prénom</th>
                    <th>Groupe</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                ${agents.map(a => `
                    <tr>
                        <td>${a.code}</td>
                        <td>${a.nom} ${a.prenom}</td>
                        <td>${a.groupe}</td>
                        <td><button class="popup-button small blue" onclick="showEditAgentForm('${a.code}')">Modifier</button></td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

function showEditAgentForm(code) {
    const agent = agents.find(a=>a.code===code);
    if (!agent) return;
    const html = `
        <div class="info-section">
            <h3>Modifier ${code}</h3>
            <form id="editAgentForm" onsubmit="return updateAgent('${code}', event)">
                <div class="form-group"><label>Code</label><input type="text" value="${agent.code}" readonly></div>
                <div class="form-group"><label>Nom *</label><input type="text" id="editNom" value="${agent.nom}" required></div>
                <div class="form-group"><label>Prénom *</label><input type="text" id="editPrenom" value="${agent.prenom}" required></div>
                <div class="form-group"><label>Groupe</label><select id="editGroupe">
                    <option value="A" ${agent.groupe==='A'?'selected':''}>A</option>
                    <option value="B" ${agent.groupe==='B'?'selected':''}>B</option>
                    <option value="C" ${agent.groupe==='C'?'selected':''}>C</option>
                    <option value="D" ${agent.groupe==='D'?'selected':''}>D</option>
                    <option value="E" ${agent.groupe==='E'?'selected':''}>E</option>
                    <option value="J" ${agent.groupe==='J'?'selected':''}>Joker</option>
                </select></div>
                <div class="form-group"><label>Matricule</label><input type="text" id="editMatricule" value="${agent.matricule||''}"></div>
                <div class="form-group"><label>CIN</label><input type="text" id="editCIN" value="${agent.cin||''}"></div>
                <div class="form-group"><label>Téléphone</label><input type="text" id="editTel" value="${agent.tel||''}"></div>
                <div class="form-group"><label>Poste</label><input type="text" id="editPoste" value="${agent.poste||''}"></div>
                <div class="form-group"><label>Date entrée</label><input type="date" id="editDateEntree" value="${agent.date_entree||''}"></div>
                <div class="form-group"><label>Date sortie</label><input type="date" id="editDateSortie" value="${agent.date_sortie||''}"></div>
            </form>
        </div>
    `;
    openPopup(`✏️ Modifier ${code}`, html, `
        <button class="popup-button green" onclick="document.getElementById('editAgentForm').submit()">💾 Enregistrer</button>
        <button class="popup-button blue" onclick="showEditAgentList()">↩️ Retour</button>
        <button class="popup-button gray" onclick="closePopup()">Annuler</button>
    `);
}

function updateAgent(oldCode, event) {
    event.preventDefault();
    const idx = agents.findIndex(a=>a.code===oldCode);
    if (idx===-1) { showSnackbar("⚠️ Agent non trouvé"); return false; }
    agents[idx] = {
        ...agents[idx],
        nom: document.getElementById('editNom').value,
        prenom: document.getElementById('editPrenom').value,
        groupe: document.getElementById('editGroupe').value,
        matricule: document.getElementById('editMatricule').value,
        cin: document.getElementById('editCIN').value,
        tel: document.getElementById('editTel').value,
        poste: document.getElementById('editPoste').value,
        date_entree: document.getElementById('editDateEntree').value,
        date_sortie: document.getElementById('editDateSortie').value || null,
        statut: document.getElementById('editDateSortie').value ? 'inactif' : 'actif'
    };
    saveData();
    showSnackbar(`✅ Agent ${oldCode} modifié`);
    displayAgentsList();
    closePopup();
    return false;
}

function showDeleteAgentList() {
    const actifs = agents.filter(a=>a.statut==='actif');
    if (!actifs.length) { showSnackbar("⚠️ Aucun agent actif"); return; }
    const html = `
        <div class="info-section">
            <h3>Supprimer un agent</h3>
            <input type="text" id="searchDeleteAgent" placeholder="Rechercher..." onkeyup="filterDeleteAgents()" style="width:100%; margin-bottom:15px;">
            <div id="delete-list-container">${generateDeleteAgentsList(actifs)}</div>
        </div>
    `;
    openPopup("🗑️ Supprimer Agent", html, `<button class="popup-button gray" onclick="closePopup()">Annuler</button>`);
}

function generateDeleteAgentsList(agentsList) {
    return `
        <table class="classement-table">
            <thead>
                <tr>
                    <th>Code</th>
                    <th>Nom & Prénom</th>
                    <th>Groupe</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                ${agentsList.map(a => `
                    <tr>
                        <td>${a.code}</td>
                        <td>${a.nom} ${a.prenom}</td>
                        <td>${a.groupe}</td>
                        <td><button class="popup-button small red" onclick="confirmDeleteAgent('${a.code}')">Supprimer</button></td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

function confirmDeleteAgent(code) {
    if (confirm(`Supprimer ${code} ?`)) {
        const idx = agents.findIndex(a=>a.code===code);
        if (idx!==-1) {
            agents[idx].date_sortie = new Date().toISOString().split('T')[0];
            agents[idx].statut = 'inactif';
            saveData();
            showSnackbar(`✅ Agent ${code} marqué inactif`);
            displayAgentsList();
            closePopup();
        }
    }
}

function filterAgents() {
    const val = document.getElementById('searchAgent')?.value.toLowerCase()||'';
    const filtered = agents.filter(a=>a.nom.toLowerCase().includes(val)||a.prenom.toLowerCase().includes(val)||a.code.toLowerCase().includes(val));
    document.getElementById('list-container').innerHTML = generateAgentsTable(filtered);
}

function filterEditAgents() {
    const val = document.getElementById('searchEditAgent')?.value.toLowerCase()||'';
    const filtered = agents.filter(a=>a.nom.toLowerCase().includes(val)||a.code.toLowerCase().includes(val)||a.prenom.toLowerCase().includes(val));
    document.getElementById('edit-list-container').innerHTML = generateEditAgentsList(filtered);
}

function filterDeleteAgents() {
    const val = document.getElementById('searchDeleteAgent')?.value.toLowerCase()||'';
    const actifs = agents.filter(a=>a.statut==='actif');
    const filtered = actifs.filter(a=>a.nom.toLowerCase().includes(val)||a.code.toLowerCase().includes(val)||a.prenom.toLowerCase().includes(val));
    document.getElementById('delete-list-container').innerHTML = generateDeleteAgentsList(filtered);
}

function refreshAgentsList() { displayAgentsList(); }

function initializeTestDataWithConfirm() {
    if (confirm("Initialiser avec données de test ?")) {
        initializeTestData();
        showSnackbar("✅ Données de test initialisées");
        displayAgentsManagementMenu();
    }
}

function exportAgentsData() {
    let csv = "Code;Nom;Prénom;Groupe;Matricule;CIN;Téléphone;Poste;Date entrée;Statut\n";
    agents.forEach(a=>csv+=`${a.code};${a.nom};${a.prenom};${a.groupe};${a.matricule||''};${a.cin||''};${a.tel||''};${a.poste||''};${a.date_entree||''};${a.statut}\n`);
    downloadCSV(csv, `Agents_${new Date().toISOString().split('T')[0]}.csv`);
    showSnackbar("✅ Export agents");
}

function exportAgentsCSV() { exportAgentsData(); }

function showImportExcelForm() {
    const html = `
        <div class="info-section">
            <h3>📁 Importer Excel</h3>
            <div class="form-group"><label>Fichier Excel</label><input type="file" id="excelFile" accept=".xlsx,.xls"></div>
            <div class="form-group"><label>Mode</label><div><label><input type="radio" name="importMode" value="replace" checked> Remplacer</label><label><input type="radio" name="importMode" value="merge"> Fusionner</label></div></div>
            <div id="importPreview"></div>
        </div>
    `;
    openPopup("📁 Importer Excel", html, `
        <button class="popup-button green" onclick="importExcelFile()">📥 Importer</button>
        <button class="popup-button gray" onclick="displayAgentsManagementMenu()">Annuler</button>
    `);
    document.getElementById('excelFile').addEventListener('change', previewExcelFile);
}

function previewExcelFile() {
    const file = document.getElementById('excelFile').files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, {type:'array'});
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const json = XLSX.utils.sheet_to_json(sheet, {header:1});
        if (json.length<2) return;
        const previewData = json.slice(1,11).map(row=> ({code:row[0], nom:row[1], prenom:row[2], groupe:row[3]}));
        document.getElementById('importPreview').innerHTML = `
            <h4>Aperçu</h4>
            <table class="classement-table">
                <thead><tr><th>Code</th><th>Nom</th><th>Prénom</th><th>Groupe</th></tr></thead>
                <tbody>${previewData.map(a => `<tr><td>${a.code}</td><td>${a.nom}</td><td>${a.prenom}</td><td>${a.groupe}</td></tr>`).join('')}</tbody>
            </table>
            <p>Total: ${json.length-1} agents</p>
        `;
        window.importedData = json;
    };
    reader.readAsArrayBuffer(file);
}

function importExcelFile() {
    if (!window.importedData) { showSnackbar("⚠️ Sélectionnez un fichier"); return; }
    const json = window.importedData;
    const mode = document.querySelector('input[name="importMode"]:checked').value;
    const newAgents = [];
    for (let i=1; i<json.length; i++) {
        const row = json[i];
        if (row.length>=4 && row[0] && row[1] && row[2] && row[3]) {
            newAgents.push({
                code: String(row[0]).toUpperCase().trim(),
                nom: String(row[1]).trim(),
                prenom: String(row[2]).trim(),
                groupe: String(row[3]).toUpperCase().trim(),
                matricule: row[4] ? String(row[4]).trim() : '',
                cin: row[5] ? String(row[5]).trim() : '',
                tel: row[6] ? String(row[6]).trim() : '',
                poste: row[7] ? String(row[7]).trim() : '',
                date_entree: new Date().toISOString().split('T')[0],
                date_sortie: null, statut: 'actif'
            });
        }
    }
    if (!newAgents.length) { showSnackbar("⚠️ Aucun agent valide"); return; }
    if (mode === 'replace') { agents.length=0; agents.push(...newAgents); }
    else {
        const existing = new Set(agents.map(a=>a.code));
        newAgents.forEach(a=>{ if(!existing.has(a.code)) agents.push(a); });
    }
    saveData();
    showSnackbar(`✅ ${newAgents.length} agents importés`);
    closePopup();
    displayAgentsList();
}

function showImportCSVForm() {
    const html = `
        <div class="info-section">
            <h3>📥 Importer CSV</h3>
            <div class="form-group"><label>Fichier CSV</label><input type="file" id="csvFile" accept=".csv"></div>
            <div class="form-group"><label>Mode</label><div><label><input type="radio" name="csvImportMode" value="replace" checked> Remplacer</label><label><input type="radio" name="csvImportMode" value="merge"> Fusionner</label></div></div>
        </div>
    `;
    openPopup("📥 Importer CSV", html, `
        <button class="popup-button green" onclick="importCSVFile()">📥 Importer</button>
        <button class="popup-button gray" onclick="displayAgentsManagementMenu()">Annuler</button>
    `);
}

function importCSVFile() {
    const file = document.getElementById('csvFile').files[0];
    if (!file) { showSnackbar("⚠️ Sélectionnez un fichier"); return; }
    const reader = new FileReader();
    reader.onload = e => {
        const lines = e.target.result.split(/\r?\n/);
        const newAgents = [];
        for (let i=1; i<lines.length; i++) {
            if (!lines[i].trim()) continue;
            const cols = lines[i].split(';');
            if (cols.length>=4 && cols[0] && cols[1] && cols[2] && cols[3]) {
                newAgents.push({
                    code: cols[0].toUpperCase().trim(),
                    nom: cols[1].trim(),
                    prenom: cols[2].trim(),
                    groupe: cols[3].toUpperCase().trim(),
                    matricule: cols[4]?cols[4].trim():'',
                    cin: cols[5]?cols[5].trim():'',
                    tel: cols[6]?cols[6].trim():'',
                    poste: cols[7]?cols[7].trim():'',
                    date_entree: new Date().toISOString().split('T')[0],
                    date_sortie: null, statut: 'actif'
                });
            }
        }
        if (!newAgents.length) { showSnackbar("⚠️ Aucun agent valide"); return; }
        const mode = document.querySelector('input[name="csvImportMode"]:checked').value;
        if (mode === 'replace') { agents.length=0; agents.push(...newAgents); }
        else {
            const existing = new Set(agents.map(a=>a.code));
            newAgents.forEach(a=>{ if(!existing.has(a.code)) agents.push(a); });
        }
        saveData();
        showSnackbar(`✅ ${newAgents.length} agents importés`);
        closePopup();
        displayAgentsList();
    };
    reader.readAsText(file, 'UTF-8');
}
// ==================== PARTIE 4 : GESTION DU PLANNING ====================

function displayPlanningMenu() {
    displaySubMenu("GESTION DU PLANNING", [
        { text: "📅 Planning Mensuel", handler: showMonthlyPlanning },
        { text: "👥 Planning par Groupe", handler: showGroupPlanningSelection },
        { text: "👤 Planning par Agent", handler: showAgentPlanningSelection },
        { text: "📊 Planning Trimestriel", handler: showTrimestrialPlanning },
        { text: "✏️ Modifier Shift", handler: showShiftModificationForm },
        { text: "🔄 Échanger Shifts", handler: showShiftExchangeForm },
        { text: "➕ Ajouter Absence", handler: () => showAddLeaveForm() },
        { text: "🔄 Générer Planning", handler: generatePlanning },
        { text: "↩️ Retour Menu Principal", handler: displayMainMenu, className: "back-button" }
    ]);
}

function showMonthlyPlanning() {
    const today = new Date();
    const currentMonth = today.getMonth()+1;
    const currentYear = today.getFullYear();
    const html = `
        <div class="info-section">
            <h3>Sélection du mois</h3>
            <div class="form-group"><label>Mois</label><select id="planningMonth">${Array.from({length:12},(_,i)=>`<option value="${i+1}" ${i+1===currentMonth?'selected':''}>${MOIS_FRANCAIS[i]}</option>`).join('')}</select></div>
            <div class="form-group"><label>Année</label><input type="number" id="planningYear" value="${currentYear}"></div>
            <div class="form-group"><label>Type</label><select id="planningType"><option value="global">Global</option><option value="groupe">Par groupe</option><option value="agent">Par agent</option></select></div>
            <div id="groupSelector" style="display:none"><div class="form-group"><label>Groupe</label><select id="selectedGroup"><option value="A">A</option><option value="B">B</option><option value="C">C</option><option value="D">D</option><option value="E">E</option><option value="J">Joker</option></select></div></div>
            <div id="agentSelector" style="display:none"><div class="form-group"><label>Agent</label><select id="selectedAgent">${agents.filter(a=>a.statut==='actif').map(a=>`<option value="${a.code}">${a.nom} ${a.prenom}</option>`).join('')}</select></div><div class="form-group"><label>Recherche</label><input type="text" id="searchAgentPlanning" onkeyup="filterAgentPlanningList()"></div></div>
        </div>
    `;
    openPopup("📅 Planning Mensuel", html, `
        <button class="popup-button green" onclick="generateMonthlyPlanning()">📋 Générer</button>
        <button class="popup-button gray" onclick="displayPlanningMenu()">Annuler</button>
    `);
    document.getElementById('planningType').addEventListener('change', function() {
        document.getElementById('groupSelector').style.display = this.value === 'groupe' ? 'block' : 'none';
        document.getElementById('agentSelector').style.display = this.value === 'agent' ? 'block' : 'none';
    });
}

function filterAgentPlanningList() {
    const term = document.getElementById('searchAgentPlanning').value.toLowerCase();
    const select = document.getElementById('selectedAgent');
    Array.from(select.options).forEach(opt => opt.style.display = opt.text.toLowerCase().includes(term) ? '' : 'none');
}

function generateMonthlyPlanning() {
    const month = parseInt(document.getElementById('planningMonth').value);
    const year = parseInt(document.getElementById('planningYear').value);
    const type = document.getElementById('planningType').value;
    if (type === 'groupe') showGroupPlanning(document.getElementById('selectedGroup').value, month, year);
    else if (type === 'agent') showAgentPlanning(document.getElementById('selectedAgent').value, month, year);
    else showGlobalPlanning(month, year);
}

function showGroupPlanningSelection() {
    const html = `<div class="info-section"><h3>Sélection du groupe</h3><div class="form-group"><label>Groupe</label><select id="selectedGroupPlanning"><option value="A">A</option><option value="B">B</option><option value="C">C</option><option value="D">D</option><option value="E">E</option><option value="J">Joker</option></select></div><div class="form-group"><label>Mois</label><select id="groupMonth">${Array.from({length:12},(_,i)=>`<option value="${i+1}">${MOIS_FRANCAIS[i]}</option>`).join('')}</select></div><div class="form-group"><label>Année</label><input type="number" id="groupYear" value="${new Date().getFullYear()}"></div></div>`;
    openPopup("👥 Planning par Groupe", html, `
        <button class="popup-button green" onclick="showSelectedGroupPlanning()">📋 Voir</button>
        <button class="popup-button gray" onclick="displayPlanningMenu()">Annuler</button>
    `);
}

function showSelectedGroupPlanning() {
    showGroupPlanning(document.getElementById('selectedGroupPlanning').value, parseInt(document.getElementById('groupMonth').value), parseInt(document.getElementById('groupYear').value));
}

function showGroupPlanning(group, month, year) {
    const groupAgents = agents.filter(a => a.groupe === group && a.statut === 'actif');
    if (!groupAgents.length) { showSnackbar(`⚠️ Aucun agent dans groupe ${group}`); return; }
    const daysInMonth = new Date(year, month, 0).getDate();
    const agentStats = groupAgents.map(agent => {
        const stats = calculateAgentStats(agent.code, month, year);
        const getVal = (label) => stats.find(s => s.label === label)?.value || 0;
        return {
            agent,
            conges: getVal('Congés (C)'),
            maladie: getVal('Maladie (M)'),
            autreAbsence: getVal('Autre absence (A)'),
            travailles: getVal('Total travaillés'),
            feries: getVal('Jours fériés'),
            totalGeneral: getVal('Total général')
        };
    });
    let html = `
        <div class="info-section">
            <h3>Planning Groupe ${group} - ${getMonthName(month)} ${year}</h3>
            <div style="overflow-x:auto">
                <table class="planning-table">
                    <thead>
                        <tr>
                            <th rowspan="2">Agent</th>
                            ${Array.from({length: daysInMonth}, (_, i) => {
                                const day = i + 1;
                                const date = new Date(year, month-1, day);
                                const dayName = JOURS_FRANCAIS[date.getDay()];
                                const isHoliday = isHolidayDate(date);
                                return `<th class="${isHoliday ? 'holiday' : ''}">${day}<br>${dayName}</th>`;
                            }).join('')}
                            <th rowspan="2">Congés</th>
                            <th rowspan="2">Maladie</th>
                            <th rowspan="2">Autre<br>abs.</th>
                            <th rowspan="2">Travaillés</th>
                            <th rowspan="2">Jours<br>fériés</th>
                            <th rowspan="2">Total<br>général</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${groupAgents.map(agent => {
                            let shiftsHtml = '';
                            for (let day = 1; day <= daysInMonth; day++) {
                                const dateStr = `${year}-${month.toString().padStart(2,'0')}-${day.toString().padStart(2,'0')}`;
                                const shift = getShiftForAgent(agent.code, dateStr);
                                const color = SHIFT_COLORS[shift] || '#7f8c8d';
                                let title = '';
                                let extraIcon = '';
                                const existing = planningData[dateStr.substring(0,7)]?.[agent.code]?.[dateStr];
                                if (existing && ['C','M','A'].includes(existing.shift)) {
                                    const joker = findJokerForDate(agent.code, dateStr);
                                    if (joker) {
                                        title = `title="Remplacé par ${joker}"`;
                                        extraIcon = ' 🔄';
                                    }
                                } else if (existing && existing.type === 'remplacement_joker') {
                                    const remplaceQui = existing.comment.match(/Remplace (\w+)/)?.[1] || '?';
                                    title = `title="Remplace ${remplaceQui}"`;
                                    extraIcon = ' ⚡';
                                }
                                shiftsHtml += `<td class="shift-cell" style="background-color:${color}; color:white;" ${title} onclick="showShiftModification('${agent.code}','${dateStr}','${shift}')">${shift}${extraIcon}</td>`;
                            }
                            const stats = agentStats.find(s => s.agent.code === agent.code);
                            return `
                                <tr>
                                    <td nowrap><strong>${agent.code}</strong><br>${agent.nom} ${agent.prenom}</td>
                                    ${shiftsHtml}
                                    <td>${stats.conges}</td>
                                    <td>${stats.maladie}</td>
                                    <td>${stats.autreAbsence}</td>
                                    <td><strong>${stats.travailles}</strong></td>
                                    <td>${stats.feries}</td>
                                    <td><strong>${stats.totalGeneral}</strong></td>
                                </tr>
                            `;
                        }).join('')}
                    </tbody>
                    <tfoot style="background-color: #2c3e50; font-weight: bold;">
                        <tr>
                            <td colspan="1">Totaux groupe</td>
                            ${Array.from({length: daysInMonth}, () => '<td></td>').join('')}
                            <td>${agentStats.reduce((s, a) => s + a.conges, 0)}</td>
                            <td>${agentStats.reduce((s, a) => s + a.maladie, 0)}</td>
                            <td>${agentStats.reduce((s, a) => s + a.autreAbsence, 0)}</td>
                            <td>${agentStats.reduce((s, a) => s + a.travailles, 0)}</td>
                            <td>${agentStats.reduce((s, a) => s + a.feries, 0)}</td>
                            <td>${agentStats.reduce((s, a) => s + a.totalGeneral, 0)}</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    `;
    openPopup(`📅 Planning Groupe ${group}`, html, `
        <button class="popup-button blue" onclick="showMonthlyPlanning()">🔄 Nouveau</button>
        <button class="popup-button gray" onclick="displayPlanningMenu()">Retour</button>
    `);
}

function showGlobalPlanning(month, year) {
    const agentsActifs = agents.filter(a => a.statut === 'actif');
    if (!agentsActifs.length) { showSnackbar("⚠️ Aucun agent actif"); return; }
    const daysInMonth = new Date(year, month, 0).getDate();
    const agentStats = agentsActifs.map(agent => {
        const stats = calculateAgentStats(agent.code, month, year);
        const getVal = (label) => stats.find(s => s.label === label)?.value || 0;
        return {
            agent,
            conges: getVal('Congés (C)'),
            maladie: getVal('Maladie (M)'),
            autreAbsence: getVal('Autre absence (A)'),
            travailles: getVal('Total travaillés'),
            feries: getVal('Jours fériés'),
            totalGeneral: getVal('Total général')
        };
    });
    let html = `
        <div class="info-section">
            <h3>Planning Global - ${getMonthName(month)} ${year}</h3>
            <div style="overflow-x:auto">
                <table class="planning-table">
                    <thead>
                        <tr>
                            <th rowspan="2">Agent</th>
                            <th rowspan="2">Groupe</th>
                            ${Array.from({length: daysInMonth}, (_, i) => {
                                const day = i + 1;
                                const date = new Date(year, month-1, day);
                                const dayName = JOURS_FRANCAIS[date.getDay()];
                                const isHoliday = isHolidayDate(date);
                                return `<th class="${isHoliday ? 'holiday' : ''}">${day}<br>${dayName}</th>`;
                            }).join('')}
                            <th rowspan="2">Congés</th>
                            <th rowspan="2">Maladie</th>
                            <th rowspan="2">Autre<br>abs.</th>
                            <th rowspan="2">Travaillés</th>
                            <th rowspan="2">Jours<br>fériés</th>
                            <th rowspan="2">Total<br>général</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${agentsActifs.map(agent => {
                            let shiftsHtml = '';
                            for (let day = 1; day <= daysInMonth; day++) {
                                const dateStr = `${year}-${month.toString().padStart(2,'0')}-${day.toString().padStart(2,'0')}`;
                                const shift = getShiftForAgent(agent.code, dateStr);
                                const color = SHIFT_COLORS[shift] || '#7f8c8d';
                                let title = '';
                                let extraIcon = '';
                                const existing = planningData[dateStr.substring(0,7)]?.[agent.code]?.[dateStr];
                                if (existing && ['C','M','A'].includes(existing.shift)) {
                                    const joker = findJokerForDate(agent.code, dateStr);
                                    if (joker) {
                                        title = `title="Remplacé par ${joker}"`;
                                        extraIcon = ' 🔄';
                                    }
                                } else if (existing && existing.type === 'remplacement_joker') {
                                    const remplaceQui = existing.comment.match(/Remplace (\w+)/)?.[1] || '?';
                                    title = `title="Remplace ${remplaceQui}"`;
                                    extraIcon = ' ⚡';
                                }
                                shiftsHtml += `<td class="shift-cell" style="background-color:${color}; color:white;" ${title} onclick="showShiftModification('${agent.code}','${dateStr}','${shift}')">${shift}${extraIcon}</td>`;
                            }
                            const stats = agentStats.find(s => s.agent.code === agent.code);
                            return `
                                <tr>
                                    <td nowrap><strong>${agent.code}</strong><br>${agent.nom} ${agent.prenom}</td>
                                    <td>${agent.groupe}</td>
                                    ${shiftsHtml}
                                    <td>${stats.conges}</td>
                                    <td>${stats.maladie}</td>
                                    <td>${stats.autreAbsence}</td>
                                    <td><strong>${stats.travailles}</strong></td>
                                    <td>${stats.feries}</td>
                                    <td><strong>${stats.totalGeneral}</strong></td>
                                </tr>
                            `;
                        }).join('')}
                    </tbody>
                    <tfoot style="background-color: #2c3e50; font-weight: bold;">
                        <tr>
                            <td colspan="2">Totaux généraux</td>
                            ${Array.from({length: daysInMonth}, () => '<td></td>').join('')}
                            <td>${agentStats.reduce((s, a) => s + a.conges, 0)}</td>
                            <td>${agentStats.reduce((s, a) => s + a.maladie, 0)}</td>
                            <td>${agentStats.reduce((s, a) => s + a.autreAbsence, 0)}</td>
                            <td>${agentStats.reduce((s, a) => s + a.travailles, 0)}</td>
                            <td>${agentStats.reduce((s, a) => s + a.feries, 0)}</td>
                            <td>${agentStats.reduce((s, a) => s + a.totalGeneral, 0)}</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    `;
    openPopup(`📅 Planning Global ${getMonthName(month)} ${year}`, html, `
        <button class="popup-button blue" onclick="showMonthlyPlanning()">🔄 Nouveau</button>
        <button class="popup-button gray" onclick="displayPlanningMenu()">Retour</button>
    `);
}

function showAgentPlanningSelection() {
    const html = `
        <div class="info-section">
            <h3>Sélection de l'agent</h3>
            <div class="form-group"><label>Recherche</label><input type="text" id="searchAgentSelect" onkeyup="filterAgentSelectList()"></div>
            <div class="form-group"><label>Agent</label><select id="selectedAgentPlanning" size="5">${agents.filter(a=>a.statut==='actif').map(a=>`<option value="${a.code}">${a.nom} ${a.prenom} (${a.code})</option>`).join('')}</select></div>
            <div class="form-group"><label>Mois</label><select id="agentMonth">${Array.from({length:12},(_,i)=>`<option value="${i+1}">${MOIS_FRANCAIS[i]}</option>`).join('')}</select></div>
            <div class="form-group"><label>Année</label><input type="number" id="agentYear" value="${new Date().getFullYear()}"></div>
        </div>
    `;
    openPopup("👤 Planning par Agent", html, `
        <button class="popup-button green" onclick="showSelectedAgentPlanning()">📋 Voir</button>
        <button class="popup-button gray" onclick="displayPlanningMenu()">Annuler</button>
    `);
}

function filterAgentSelectList() {
    const term = document.getElementById('searchAgentSelect').value.toLowerCase();
    const select = document.getElementById('selectedAgentPlanning');
    Array.from(select.options).forEach(opt => opt.style.display = opt.text.toLowerCase().includes(term) ? '' : 'none');
}

function showSelectedAgentPlanning() {
    showAgentPlanning(document.getElementById('selectedAgentPlanning').value, parseInt(document.getElementById('agentMonth').value), parseInt(document.getElementById('agentYear').value));
}

function showAgentPlanning(agentCode, month, year) {
    const agent = agents.find(a => a.code === agentCode);
    if (!agent) { showSnackbar("⚠️ Agent non trouvé"); return; }
    const daysInMonth = new Date(year, month, 0).getDate();
    const isJoker = (agent.groupe === 'J');
    
    let rows = [];
    for (let day = 1; day <= daysInMonth; day++) {
        const dateStr = `${year}-${month.toString().padStart(2,'0')}-${day.toString().padStart(2,'0')}`;
        const date = new Date(year, month-1, day);
        const dayName = JOURS_FRANCAIS[date.getDay()];
        const isHoliday = isHolidayDate(date);
        const shift = getShiftForAgent(agentCode, dateStr);
        const color = SHIFT_COLORS[shift] || '#7f8c8d';
        
        let remplacant = '';
        let title = '';
        let extraIcon = '';
        const monthKey = dateStr.substring(0,7);
        const existing = planningData[monthKey]?.[agentCode]?.[dateStr];
        
        if (isJoker) {
            const remplaces = [];
            for (let a of agents) {
                if (a.groupe === 'J') continue;
                const entry = planningData[monthKey]?.[a.code]?.[dateStr];
                if (entry && ['C','M','A'].includes(entry.shift)) {
                    const joker = findJokerForDate(a.code, dateStr);
                    if (joker === agentCode) {
                        remplaces.push(a.code);
                    }
                }
            }
            if (remplaces.length) {
                remplacant = `Remplace : ${remplaces.join(', ')}`;
                extraIcon = ' 🔄';
                title = `Remplace ${remplaces.join(', ')}`;
            }
        } else {
            const joker = findJokerForDate(agentCode, dateStr);
            if (joker) {
                remplacant = `Remplacé par : ${joker}`;
                extraIcon = ' 🔄';
                title = `Remplacé par ${joker}`;
            }
        }
        
        rows.push({
            day, dayName, isHoliday, shift, color, title, extraIcon, remplacant,
            dateStr: dateStr
        });
    }
    
    let stats = calculateAgentStats(agentCode, month, year);
    const getVal = (label) => stats.find(s => s.label === label)?.value || 0;
    const conges = getVal('Congés (C)');
    const maladie = getVal('Maladie (M)');
    const autreAbsence = getVal('Autre absence (A)');
    const travailles = getVal('Total travaillés');
    const feries = getVal('Jours fériés');
    const totalGeneral = getVal('Total général');
    
    let html = `
        <div class="info-section">
            <h3>Planning de ${agent.nom} ${agent.prenom} (${agent.code})</h3>
            <p>Mois : ${getMonthName(month)} ${year}</p>
            <div style="overflow-x:auto">
                <table class="planning-table" style="width:100%; border-collapse:collapse;">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Jour</th>
                            <th style="background-color:#2c3e50;">Shift</th>
                            <th>Remplacement</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${rows.map(r => `
                            <tr>
                                <td style="padding:6px; border:1px solid #555;">${r.day}</td>
                                <td style="padding:6px; border:1px solid #555; ${r.isHoliday ? 'background-color:#f39c12; color:black;' : ''}">${r.dayName}</td>
                                <td style="background-color:${r.color}; color:white; text-align:center; padding:6px;" title="${r.title}">
                                    ${r.shift}${r.extraIcon}
                                </td>
                                <td style="padding:6px; border:1px solid #555;">${r.remplacant || '-'}</td>
                                <td style="padding:6px; border:1px solid #555; text-align:center;">
                                    <button class="action-btn small red" onclick="deleteAbsenceForDate('${agentCode}','${r.dateStr}')">🗑️ Suppr</button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                    <tfoot style="background-color: #2c3e50; font-weight: bold;">
                        <tr>
                            <td colspan="2">Totaux</td>
                            <td style="text-align:center;">Travaillés : ${travailles}<br>Congés : ${conges}<br>Maladie : ${maladie}<br>Autre abs. : ${autreAbsence}<br>Fériés : ${feries}<br>Total général : ${totalGeneral}</td>
                            <td colspan="2"></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    `;
    openPopup(`📅 Planning ${agent.code}`, html, `
        <button class="popup-button blue" onclick="showMonthlyPlanning()">🔄 Nouveau</button>
        <button class="popup-button gray" onclick="displayPlanningMenu()">Retour</button>
    `);
}

function showShiftModificationForm() {
    const html = `
        <div class="info-section">
            <h3>✏️ Modifier un shift</h3>
            <div class="form-group"><label>Agent</label><select id="shiftAgent">${agents.filter(a=>a.statut==='actif').map(a=>`<option value="${a.code}">${a.nom} ${a.prenom}</option>`).join('')}</select></div>
            <div class="form-group"><label>Date</label><input type="date" id="shiftDate" required></div>
            <div class="form-group"><label>Nouveau shift</label><select id="newShiftSelect">${Object.entries(SHIFT_LABELS).map(([c,l])=>`<option value="${c}">${c} - ${l}</option>`).join('')}</select></div>
            <div class="form-group"><label>Commentaire</label><textarea id="shiftComment" rows="2"></textarea></div>
        </div>
    `;
    openPopup("✏️ Modifier Shift", html, `
        <button class="popup-button green" onclick="applyShiftModification()">💾 Appliquer</button>
        <button class="popup-button gray" onclick="closePopup()">Annuler</button>
    `);
}

function applyShiftModification() {
    const agentCode = document.getElementById('shiftAgent').value;
    const dateStr = document.getElementById('shiftDate').value;
    const newShift = document.getElementById('newShiftSelect').value;
    const comment = document.getElementById('shiftComment').value;
    if (!agentCode || !dateStr) { showSnackbar("⚠️ Agent et date requis"); return; }
    const monthKey = dateStr.substring(0,7);
    if (!planningData[monthKey]) planningData[monthKey] = {};
    if (!planningData[monthKey][agentCode]) planningData[monthKey][agentCode] = {};
    planningData[monthKey][agentCode][dateStr] = { shift: newShift, type: 'modification_manuelle', comment, modified_at: new Date().toISOString() };
    saveData();
    showSnackbar(`✅ Shift modifié pour ${agentCode}`);
    closePopup();
}

function showShiftModification(agentCode, dateStr, currentShift) {
    const isAbsence = ['C','M','A'].includes(currentShift);
    const html = `
        <div class="info-section">
            <h3>Modifier shift - ${agentCode}</h3>
            <p>Date: ${dateStr} | Actuel: ${SHIFT_LABELS[currentShift]}</p>
            <div class="form-group"><label>Nouveau</label><select id="quickShiftSelect">${Object.entries(SHIFT_LABELS).map(([c,l])=>`<option value="${c}" ${c===currentShift?'selected':''}>${c} - ${l}</option>`).join('')}</select></div>
            <div class="form-group"><label>Commentaire</label><textarea id="quickShiftComment" rows="2"></textarea></div>
        </div>
    `;
    openPopup("✏️ Modifier Shift", html, `
        <button class="popup-button green" onclick="applyQuickShiftModification('${agentCode}','${dateStr}')">💾 Appliquer</button>
        ${isAbsence ? `<button class="popup-button red" onclick="deleteAbsenceForDate('${agentCode}','${dateStr}')">🗑️ Supprimer l'absence</button>` : ''}
        <button class="popup-button gray" onclick="closePopup()">Annuler</button>
    `);
}

function applyQuickShiftModification(agentCode, dateStr) {
    const newShift = document.getElementById('quickShiftSelect').value;
    const comment = document.getElementById('quickShiftComment').value;
    const monthKey = dateStr.substring(0,7);
    if (!planningData[monthKey]) planningData[monthKey] = {};
    if (!planningData[monthKey][agentCode]) planningData[monthKey][agentCode] = {};
    planningData[monthKey][agentCode][dateStr] = { shift: newShift, type: 'modification_manuelle', comment, modified_at: new Date().toISOString() };
    saveData();
    showSnackbar(`✅ Shift modifié pour ${agentCode}`);
    closePopup();
}

function deleteAbsenceForDate(agentCode, dateStr) {
    if (!confirm(`Supprimer l'absence du ${dateStr} pour ${agentCode} ?`)) return;
    const monthKey = dateStr.substring(0,7);
    const existing = planningData[monthKey]?.[agentCode]?.[dateStr];
    if (!existing || !['C','M','A'].includes(existing.shift)) {
        showSnackbar("⚠️ Aucune absence à supprimer à cette date");
        return;
    }
    delete planningData[monthKey][agentCode][dateStr];
    for (let jc of Object.keys(planningData[monthKey] || {})) {
        const entry = planningData[monthKey][jc]?.[dateStr];
        if (entry && entry.type === 'remplacement_joker' && entry.comment?.includes(agentCode)) {
            delete planningData[monthKey][jc][dateStr];
            if (jokerAssignments[dateStr]) jokerAssignments[dateStr].delete(jc);
        }
    }
    saveData();
    showSnackbar("✅ Absence et remplacement supprimés");
    const month = parseInt(dateStr.substring(5,7));
    const year = parseInt(dateStr.substring(0,4));
    showAgentPlanning(agentCode, month, year);
}

function showShiftExchangeForm() {
    const html = `
        <div class="info-section">
            <h3>🔄 Échanger Shifts</h3>
            <div class="form-group"><label>Agent 1</label><select id="exchangeAgent1">${agents.filter(a=>a.statut==='actif').map(a=>`<option value="${a.code}">${a.nom} ${a.prenom}</option>`).join('')}</select></div>
            <div class="form-group"><label>Date 1</label><input type="date" id="exchangeDate1"></div>
            <div class="form-group"><label>Agent 2</label><select id="exchangeAgent2">${agents.filter(a=>a.statut==='actif').map(a=>`<option value="${a.code}">${a.nom} ${a.prenom}</option>`).join('')}</select></div>
            <div class="form-group"><label>Date 2</label><input type="date" id="exchangeDate2"></div>
            <div class="form-group"><label>Motif</label><textarea id="exchangeReason" rows="3"></textarea></div>
            <div id="exchangePreview"></div>
        </div>
    `;
    openPopup("🔄 Échanger Shifts", html, `
        <button class="popup-button green" onclick="previewShiftExchange()">👁️ Prévisualiser</button>
        <button class="popup-button blue" onclick="executeShiftExchange()">🔄 Exécuter</button>
        <button class="popup-button gray" onclick="displayPlanningMenu()">Annuler</button>
    `);
    ['exchangeAgent1','exchangeDate1','exchangeAgent2','exchangeDate2'].forEach(id=>document.getElementById(id).addEventListener('change', previewShiftExchange));
}

function previewShiftExchange() {
    const a1 = document.getElementById('exchangeAgent1').value;
    const d1 = document.getElementById('exchangeDate1').value;
    const a2 = document.getElementById('exchangeAgent2').value;
    const d2 = document.getElementById('exchangeDate2').value;
    if (!a1||!d1||!a2||!d2) { document.getElementById('exchangePreview').innerHTML=''; return; }
    const s1 = getShiftForAgent(a1,d1);
    const s2 = getShiftForAgent(a2,d2);
    document.getElementById('exchangePreview').innerHTML = `<strong>Prévisualisation:</strong><br>${a1} (${d1}): ${SHIFT_LABELS[s1]} → ${SHIFT_LABELS[s2]}<br>${a2} (${d2}): ${SHIFT_LABELS[s2]} → ${SHIFT_LABELS[s1]}`;
}

function executeShiftExchange() {
    const a1 = document.getElementById('exchangeAgent1').value;
    const d1 = document.getElementById('exchangeDate1').value;
    const a2 = document.getElementById('exchangeAgent2').value;
    const d2 = document.getElementById('exchangeDate2').value;
    const reason = document.getElementById('exchangeReason').value;
    if (!a1||!d1||!a2||!d2) { showSnackbar("⚠️ Tous les champs"); return; }
    const s1 = getShiftForAgent(a1,d1);
    const s2 = getShiftForAgent(a2,d2);
    const m1 = d1.substring(0,7), m2 = d2.substring(0,7);
    if (!planningData[m1]) planningData[m1]={};
    if (!planningData[m1][a1]) planningData[m1][a1]={};
    if (!planningData[m2]) planningData[m2]={};
    if (!planningData[m2][a2]) planningData[m2][a2]={};
    planningData[m1][a1][d1] = { shift: s2, type: 'echange', comment: `Échangé avec ${a2} - ${reason}`, exchanged_at: new Date().toISOString() };
    planningData[m2][a2][d2] = { shift: s1, type: 'echange', comment: `Échangé avec ${a1} - ${reason}`, exchanged_at: new Date().toISOString() };
    saveData();
    showSnackbar(`✅ Échange effectué entre ${a1} et ${a2}`);
    closePopup();
}

function generatePlanning() { showSnackbar("🔄 Génération planning..."); }
function showTrimestrialPlanning() { showSnackbar("📊 Planning trimestriel - Fonctionnalité en développement"); }
// ==================== PARTIE 5 : CONGÉS & ABSENCES (avec notifications) ====================

function displayLeavesMenu() {
    displaySubMenu("CONGÉS & ABSENCES", [
        { text: "➕ Ajouter Congé", handler: showAddLeaveForm },
        { text: "🗑️ Supprimer Congé", handler: showDeleteLeaveForm },
        { text: "📋 Liste des Congés", handler: showLeavesList },
        { text: "📅 Congés par Agent", handler: showAgentLeavesSelection },
        { text: "📊 Congés par Groupe", handler: showGroupLeavesSelection },
        { text: "⚠️ Ajouter Absence Maladie", handler: showSickLeaveForm },
        { text: "🚫 Ajouter Autre Absence", handler: showOtherAbsenceForm },
        { text: "↩️ Retour Menu Principal", handler: displayMainMenu, className: "back-button" }
    ]);
}

function showAddLeaveForm() {
    const html = `
        <div class="info-section">
            <h3>🏖️ Ajouter Congé/Absence</h3>
            <div class="form-group"><label>Type</label><select id="leaveType" onchange="toggleLeavePeriod()"><option value="single">Ponctuel</option><option value="period">Période</option></select></div>
            <div class="form-group"><label>Agent</label><select id="leaveAgent">${agents.filter(a=>a.statut==='actif').map(a=>`<option value="${a.code}">${a.nom} ${a.prenom}</option>`).join('')}</select></div>
            <div id="singleLeaveSection"><div class="form-group"><label>Date</label><input type="date" id="leaveDate"></div><div class="form-group"><label>Type absence</label><select id="absenceType"><option value="C">Congé</option><option value="M">Maladie</option><option value="A">Autre</option></select></div></div>
            <div id="periodLeaveSection" style="display:none"><div class="form-group"><label>Début</label><input type="date" id="periodStart"></div><div class="form-group"><label>Fin</label><input type="date" id="periodEnd"></div><div class="form-group"><label>Dimanches comme congés?</label><select id="sundayHandling"><option value="repos">Non (repos)</option><option value="conge">Oui (congé)</option></select></div></div>
            <div class="form-group"><label>Commentaire</label><textarea id="leaveComment" rows="3"></textarea></div>
        </div>
    `;
    openPopup("🏖️ Ajouter Congé", html, `
        <button class="popup-button green" onclick="saveLeave()">💾 Enregistrer</button>
        <button class="popup-button gray" onclick="displayLeavesMenu()">Annuler</button>
    `);
}

function toggleLeavePeriod() {
    const type = document.getElementById('leaveType').value;
    document.getElementById('singleLeaveSection').style.display = type === 'single' ? 'block' : 'none';
    document.getElementById('periodLeaveSection').style.display = type === 'period' ? 'block' : 'none';
}

async function saveLeave() {
    const leaveType = document.getElementById('leaveType').value;
    const agentCode = document.getElementById('leaveAgent').value;
    const comment = document.getElementById('leaveComment').value;
    if (!agentCode) { showSnackbar("⚠️ Sélectionnez un agent"); return; }
    
    const agent = agents.find(a => a.code === agentCode);
    if (agent && agent.groupe === 'J') {
        showSnackbar("⚠️ Un joker ne peut pas être mis en congé (il remplace les autres).");
        return;
    }
    
    if (leaveType === 'period') {
        const start = document.getElementById('periodStart').value;
        const end = document.getElementById('periodEnd').value;
        const sundayHandling = document.getElementById('sundayHandling').value;
        if (!start || !end || new Date(start) > new Date(end)) { showSnackbar("⚠️ Dates invalides"); return; }
        
        let dates = [];
        let cur = new Date(start);
        while (cur <= new Date(end)) {
            dates.push(cur.toISOString().split('T')[0]);
            cur.setDate(cur.getDate()+1);
        }
        
        let chosenJoker = null;
        if (jokerConfig.manualAssignment) {
            const sampleDate = dates[0];
            chosenJoker = await promptJokerChoice(agentCode, sampleDate, 'C');
            if (chosenJoker === 'CANCEL') { closePopup(); return; }
            if (chosenJoker) {
                for (let dateStr of dates) {
                    const available = getAvailableJokersList(dateStr);
                    if (!available.find(j => j.code === chosenJoker)) {
                        if (!confirm(`Le joker ${chosenJoker} n'est pas disponible le ${dateStr}. Voulez-vous continuer sans remplacement ?`)) {
                            closePopup();
                            return;
                        } else {
                            chosenJoker = null;
                            break;
                        }
                    }
                }
            }
        } else if (jokerConfig.maxPerDay > 0) {
            const availableFirst = getAvailableJokersList(dates[0]);
            if (availableFirst.length > 0) {
                chosenJoker = availableFirst[0].code;
                for (let dateStr of dates) {
                    const available = getAvailableJokersList(dateStr);
                    if (!available.find(j => j.code === chosenJoker)) {
                        chosenJoker = null;
                        break;
                    }
                }
            }
        }
        
        const leaveRecord = { id: 'L'+Date.now(), agent_code: agentCode, type: 'C', start_date: start, end_date: end, sunday_handling: sundayHandling, comment, created_at: new Date().toISOString() };
        let successCount = 0;
        
        for (let dateStr of dates) {
            const dateObj = new Date(dateStr);
            const isSunday = dateObj.getDay() === 0;
            let shiftType = 'C';
            if (isSunday) {
                shiftType = sundayHandling === 'repos' ? 'R' : 'C';
            }
            
            const monthKey = dateStr.substring(0,7);
            if (!planningData[monthKey]) planningData[monthKey] = {};
            if (!planningData[monthKey][agentCode]) planningData[monthKey][agentCode] = {};
            planningData[monthKey][agentCode][dateStr] = { shift: shiftType, type: 'congé_période', period_id: leaveRecord.id, recorded_at: new Date().toISOString() };
            
            if (chosenJoker) {
                const normalShift = getTheoreticalShiftWithoutAbsence(agentCode, dateStr);
                if (!planningData[monthKey][chosenJoker]) planningData[monthKey][chosenJoker] = {};
                planningData[monthKey][chosenJoker][dateStr] = {
                    shift: normalShift,
                    type: 'remplacement_joker',
                    comment: `Remplace ${agentCode} (période ${start} à ${end}) - ${comment}`,
                    period_id: leaveRecord.id,
                    recorded_at: new Date().toISOString()
                };
                if (!jokerAssignments[dateStr]) jokerAssignments[dateStr] = new Set();
                jokerAssignments[dateStr].add(chosenJoker);
                successCount++;
            }
        }
        leaves.push(leaveRecord);
        saveData();
        if (chosenJoker) {
            replacementNotifications.unshift({
                id: Date.now(),
                date: new Date().toISOString(),
                agent_absent: agentCode,
                joker: chosenJoker,
                date_absence: `${start} au ${end}`,
                lu: false
            });
            saveData();
            showSnackbar(`🔔 Joker ${chosenJoker} remplace ${agentCode} du ${start} au ${end}`);
        } else {
            showSnackbar(`✅ Période enregistrée sans remplacement`);
        }
    } else {
        const date = document.getElementById('leaveDate').value;
        const absenceType = document.getElementById('absenceType').value;
        if (!date) { showSnackbar("⚠️ Date requise"); return; }
        
        let chosenJoker = null;
        if (jokerConfig.manualAssignment && ['C','M','A'].includes(absenceType)) {
            chosenJoker = await promptJokerChoice(agentCode, date, absenceType);
            if (chosenJoker === 'CANCEL') { closePopup(); return; }
        } else if (!jokerConfig.manualAssignment && jokerConfig.maxPerDay > 0) {
            const available = getAvailableJokersList(date);
            if (available.length > 0) chosenJoker = available[0].code;
        }
        
        const monthKey = date.substring(0,7);
        if (!planningData[monthKey]) planningData[monthKey] = {};
        if (!planningData[monthKey][agentCode]) planningData[monthKey][agentCode] = {};
        planningData[monthKey][agentCode][date] = { shift: absenceType, type: 'absence', comment, recorded_at: new Date().toISOString() };
        
        if (chosenJoker) {
            const normalShift = getTheoreticalShiftWithoutAbsence(agentCode, date);
            if (!planningData[monthKey][chosenJoker]) planningData[monthKey][chosenJoker] = {};
            planningData[monthKey][chosenJoker][date] = {
                shift: normalShift,
                type: 'remplacement_joker',
                comment: `Remplace ${agentCode} (${absenceType}) - ${comment}`,
                recorded_at: new Date().toISOString()
            };
            if (!jokerAssignments[date]) jokerAssignments[date] = new Set();
            jokerAssignments[date].add(chosenJoker);
            replacementNotifications.unshift({
                id: Date.now(),
                date: new Date().toISOString(),
                agent_absent: agentCode,
                joker: chosenJoker,
                date_absence: date,
                lu: false
            });
            saveData();
            showSnackbar(`🔔 Joker ${chosenJoker} remplace ${agentCode} le ${date}`);
        } else {
            showSnackbar(`✅ ${SHIFT_LABELS[absenceType]} enregistré (sans remplacement)`);
        }
    }
    saveData();
    closePopup();
}

function showDeleteLeaveForm() {
    const allLeaves = [];
    Object.keys(planningData).forEach(monthKey=>{
        Object.keys(planningData[monthKey]).forEach(agentCode=>{
            Object.keys(planningData[monthKey][agentCode]).forEach(dateStr=>{
                const rec = planningData[monthKey][agentCode][dateStr];
                if (['C','M','A'].includes(rec.shift)) allLeaves.push({ agentCode, date: dateStr, type: rec.shift, comment: rec.comment });
            });
        });
    });
    if (leaves) leaves.forEach(l=>allLeaves.push({ agentCode: l.agent_code, date: `${l.start_date} au ${l.end_date}`, type: 'Période', comment: l.comment, periodId: l.id }));
    if (!allLeaves.length) { showSnackbar("ℹ️ Aucun congé"); return; }
    const html = `<div class="info-section"><h3>🗑️ Supprimer Congé</h3><div id="deleteLeavesContainer">${generateDeleteLeavesList(allLeaves)}</div></div>`;
    openPopup("🗑️ Supprimer Congé", html, `<button class="popup-button gray" onclick="displayLeavesMenu()">Retour</button>`);
    window.currentDeleteLeaves = allLeaves;
}

function generateDeleteLeavesList(leavesList) {
    const grouped = {};
    leavesList.forEach(l=>{ if(!grouped[l.agentCode]) grouped[l.agentCode]=[]; grouped[l.agentCode].push(l); });
    return Object.keys(grouped).map(agentCode=>{
        const agent = agents.find(a=>a.code===agentCode);
        const name = agent?`${agent.nom} ${agent.prenom}`:agentCode;
        return `<div><h4>${name}</h4>${grouped[agentCode].map(l=>`<div><span>${l.date} - ${l.type==='Période'?'Période':SHIFT_LABELS[l.type]}</span><button class="action-btn small red" onclick="deleteLeaveItem('${agentCode}','${l.date}',${l.type==='Période'},'${l.periodId||''}')">🗑️</button></div>`).join('')}</div>`;
    }).join('');
}

function deleteLeaveItem(agentCode, dateStr, isPeriod, periodId) {
    if (!confirm(`Supprimer ce congé pour ${agentCode} ?`)) return;
    if (isPeriod && periodId) {
        const idx = leaves.findIndex(l=>l.id===periodId);
        if (idx !== -1) {
            const leave = leaves[idx];
            let cur = new Date(leave.start_date);
            while (cur <= new Date(leave.end_date)) {
                const ds = cur.toISOString().split('T')[0];
                const mk = ds.substring(0,7);
                if (planningData[mk]?.[agentCode]?.[ds]) delete planningData[mk][agentCode][ds];
                for (let jc of Object.keys(planningData[mk] || {})) {
                    if (planningData[mk][jc]?.[ds]?.period_id === periodId) {
                        delete planningData[mk][jc][ds];
                    }
                }
                cur.setDate(cur.getDate()+1);
            }
            leaves.splice(idx,1);
            saveData();
            showSnackbar("✅ Période et remplacements supprimés");
        }
    } else {
        const monthKey = dateStr.substring(0,7);
        if (planningData[monthKey]?.[agentCode]?.[dateStr]) {
            delete planningData[monthKey][agentCode][dateStr];
            for (let jc of Object.keys(planningData[monthKey] || {})) {
                const entry = planningData[monthKey][jc]?.[dateStr];
                if (entry && entry.type === 'remplacement_joker' && entry.comment?.includes(agentCode)) {
                    delete planningData[monthKey][jc][dateStr];
                }
            }
            saveData();
            showSnackbar("✅ Congé et remplacement supprimés");
        }
    }
    showDeleteLeaveForm();
}

function showLeavesList() {
    const allLeaves = [];
    Object.keys(planningData).forEach(monthKey=>{
        Object.keys(planningData[monthKey]).forEach(agentCode=>{
            Object.keys(planningData[monthKey][agentCode]).forEach(dateStr=>{
                const rec = planningData[monthKey][agentCode][dateStr];
                if (['C','M','A'].includes(rec.shift)) allLeaves.push({ agentCode, date: dateStr, type: rec.shift, comment: rec.comment });
            });
        });
    });
    if (leaves) leaves.forEach(l=>allLeaves.push({ agentCode: l.agent_code, date: `${l.start_date} au ${l.end_date}`, type: 'Période', comment: l.comment }));
    if (!allLeaves.length) { openPopup("📋 Liste Congés", "<p>Aucun congé</p>", `<button class="popup-button gray" onclick="displayLeavesMenu()">Retour</button>`); return; }
    const grouped = {};
    allLeaves.forEach(l=>{ if(!grouped[l.agentCode]) grouped[l.agentCode]=[]; grouped[l.agentCode].push(l); });
    const html = `<div class="info-section"><h3>📋 Liste des Congés</h3>${Object.keys(grouped).map(agentCode=>{
        const agent = agents.find(a=>a.code===agentCode);
        return `<div><h4>${agent?agent.nom+' '+agent.prenom:agentCode}</h4>${grouped[agentCode].map(l=>`<div>${l.date} - ${l.type==='Période'?'Période':SHIFT_LABELS[l.type]} ${l.comment?`(${l.comment})`:''}</div>`).join('')}</div>`;
    }).join('')}</div>`;
    openPopup("📋 Liste Congés", html, `<button class="popup-button gray" onclick="displayLeavesMenu()">Retour</button>`);
}

function showAgentLeavesSelection() {
    const html = `<div class="info-section"><h3>Congés par Agent</h3><div class="form-group"><label>Agent</label><select id="leavesAgentSelect">${agents.filter(a=>a.statut==='actif').map(a=>`<option value="${a.code}">${a.nom} ${a.prenom}</option>`).join('')}</select></div><div class="form-group"><label>Année</label><input type="number" id="leavesYear" value="${new Date().getFullYear()}"></div></div>`;
    openPopup("📅 Congés par Agent", html, `
        <button class="popup-button green" onclick="showAgentLeaves()">📋 Voir</button>
        <button class="popup-button gray" onclick="displayLeavesMenu()">Annuler</button>
    `);
}

function showAgentLeaves() {
    const agentCode = document.getElementById('leavesAgentSelect').value;
    const year = parseInt(document.getElementById('leavesYear').value);
    const agent = agents.find(a=>a.code===agentCode);
    if (!agent) return;
    const agentLeaves = [];
    Object.keys(planningData).forEach(monthKey=>{
        if (monthKey.startsWith(year.toString())) {
            if (planningData[monthKey][agentCode]) {
                Object.keys(planningData[monthKey][agentCode]).forEach(dateStr=>{
                    const rec = planningData[monthKey][agentCode][dateStr];
                    if (['C','M','A'].includes(rec.shift)) agentLeaves.push({ date: dateStr, type: rec.shift, comment: rec.comment });
                });
            }
        }
    });
    if (leaves) leaves.filter(l=>l.agent_code===agentCode && l.start_date.startsWith(year.toString())).forEach(l=>agentLeaves.push({ date: `${l.start_date} au ${l.end_date}`, type: 'Période', comment: l.comment }));
    if (!agentLeaves.length) { showSnackbar("ℹ️ Aucun congé"); return; }
    const html = `<div class="info-section"><h3>Congés de ${agent.nom} ${agent.prenom}</h3><table class="classement-table"><thead><tr><th>Date(s)</th><th>Type</th><th>Commentaire</th></tr></thead><tbody>${agentLeaves.map(l=>`<tr><td>${l.date}</td><td>${l.type==='Période'?'Période':SHIFT_LABELS[l.type]}</td><td>${l.comment||'-'}</td></tr>`).join('')}</tbody></table></div>`;
    openPopup(`📅 Congés ${agent.code}`, html, `<button class="popup-button gray" onclick="displayLeavesMenu()">Retour</button>`);
}

function showGroupLeavesSelection() {
    const groups = [...new Set(agents.filter(a=>a.statut==='actif').map(a=>a.groupe))].sort();
    const html = `<div class="info-section"><h3>Congés par Groupe</h3><div class="form-group"><label>Groupe</label><select id="groupLeavesSelect"><option value="">Sélectionner</option>${groups.map(g=>`<option value="${g}">Groupe ${g}</option>`).join('')}</select></div><div class="form-group"><label>Année</label><input type="number" id="groupLeavesYear" value="${new Date().getFullYear()}"></div></div>`;
    openPopup("📊 Congés par Groupe", html, `
        <button class="popup-button green" onclick="showGroupLeaves()">📋 Voir</button>
        <button class="popup-button gray" onclick="displayLeavesMenu()">Annuler</button>
    `);
}

function showGroupLeaves() {
    const group = document.getElementById('groupLeavesSelect').value;
    const year = parseInt(document.getElementById('groupLeavesYear').value);
    if (!group) { showSnackbar("⚠️ Sélectionnez un groupe"); return; }
    const groupAgents = agents.filter(a=>a.groupe===group && a.statut==='actif');
    if (!groupAgents.length) { showSnackbar("⚠️ Aucun agent"); return; }
    const leavesByAgent = {};
    groupAgents.forEach(agent=>{
        leavesByAgent[agent.code] = { agent, leaves: [] };
        Object.keys(planningData).forEach(monthKey=>{
            if (monthKey.startsWith(year.toString())) {
                if (planningData[monthKey][agent.code]) {
                    Object.keys(planningData[monthKey][agent.code]).forEach(dateStr=>{
                        const rec = planningData[monthKey][agent.code][dateStr];
                        if (['C','M','A'].includes(rec.shift)) leavesByAgent[agent.code].leaves.push({ date: dateStr, type: rec.shift });
                    });
                }
            }
        });
        if (leaves) leaves.filter(l=>l.agent_code===agent.code && l.start_date.startsWith(year.toString())).forEach(l=>leavesByAgent[agent.code].leaves.push({ date: `${l.start_date} au ${l.end_date}`, type: 'Période' }));
    });
    const html = `<div class="info-section"><h3>Congés Groupe ${group} - ${year}</h3>${groupAgents.map(agent=>{
        const data = leavesByAgent[agent.code];
        return `<div><h4>${agent.nom} ${agent.prenom}</h4>${data.leaves.length?data.leaves.map(l=>`<div>${l.date} - ${l.type==='Période'?'Période':SHIFT_LABELS[l.type]}</div>`).join(''):'<div>Aucun congé</div>'}</div>`;
    }).join('')}</div>`;
    openPopup(`📊 Congés Groupe ${group}`, html, `<button class="popup-button gray" onclick="displayLeavesMenu()">Retour</button>`);
}

function showSickLeaveForm() { showAddLeaveForm(); setTimeout(()=>{ let sel=document.getElementById('absenceType'); if(sel) sel.value='M'; },100); }
function showOtherAbsenceForm() { showAddLeaveForm(); setTimeout(()=>{ let sel=document.getElementById('absenceType'); if(sel) sel.value='A'; },100); }
function showAddLeaveForAgent(agentCode) { showAddLeaveForm(); setTimeout(()=>{ let sel=document.getElementById('leaveAgent'); if(sel) sel.value=agentCode; },100); }
// ==================== PARTIE 6 : STATISTIQUES & CLASSEMENT ====================

function displayStatisticsMenu() {
    displaySubMenu("STATISTIQUES & CLASSEMENT", [
        { text: "📈 Statistiques Globales", handler: showGlobalStats },
        { text: "👤 Statistiques par Agent", handler: showAgentStatsSelection },
        { text: "📊 Jours Travaillés", handler: showWorkedDaysMenu },
        { text: "📉 Statistiques par Groupe", handler: showGroupStatsSelection },
        { text: "📋 Rapport Complet", handler: generateFullReport },
        { text: "↩️ Retour Menu Principal", handler: displayMainMenu, className: "back-button" }
    ]);
}

function showGlobalStats() {
    const actifs = agents.filter(a=>a.statut==='actif');
    const html = `<div class="info-section"><h3>Statistiques Globales</h3><div>Agents actifs: ${actifs.length}</div><div>Groupes: ${new Set(actifs.map(a=>a.groupe)).size}</div></div>`;
    openPopup("📈 Statistiques Globales", html, `<button class="popup-button gray" onclick="displayStatisticsMenu()">Retour</button>`);
}

function showAgentStatsSelection() {
    const html = `
        <div class="info-section">
            <h3>Statistiques par Agent</h3>
            <div class="form-group"><label>Agent</label><select id="agentStatsSelect">${agents.filter(a=>a.statut==='actif').map(a=>`<option value="${a.code}">${a.nom} ${a.prenom}</option>`).join('')}</select></div>
            <div class="form-group"><label>Mois</label><select id="statsMonth">${Array.from({length:12},(_,i)=>`<option value="${i+1}">${MOIS_FRANCAIS[i]}</option>`).join('')}</select></div>
            <div class="form-group"><label>Année</label><input type="number" id="statsYear" value="${new Date().getFullYear()}"></div>
        </div>
    `;
    openPopup("👤 Statistiques par Agent", html, `
        <button class="popup-button green" onclick="showAgentStats()">📊 Voir</button>
        <button class="popup-button gray" onclick="displayStatisticsMenu()">Annuler</button>
    `);
}

function showAgentStats() {
    const code = document.getElementById('agentStatsSelect').value;
    const month = parseInt(document.getElementById('statsMonth').value);
    const year = parseInt(document.getElementById('statsYear').value);
    const agent = agents.find(a => a.code === code);
    if (!agent) { showSnackbar("⚠️ Agent non trouvé"); return; }
    const stats = calculateAgentStats(code, month, year);
    let html = `
        <div class="info-section">
            <h3>Statistiques de ${agent.nom} ${agent.prenom}</h3>
            <p>Mois: ${getMonthName(month)} ${year}</p>
            <table style="width:100%; border-collapse:collapse;">
                <thead><tr style="background-color:#2c3e50;"><th style="padding:8px; border:1px solid #555; text-align:left;">Type</th><th style="padding:8px; border:1px solid #555; text-align:center;">Nombre</th></tr></thead>
                <tbody>${stats.map(s => `<tr><td style="padding:6px; border:1px solid #555;">${s.label}</td><td style="padding:6px; border:1px solid #555; text-align:center; font-weight:bold;">${s.value}</td></tr>`).join('')}</tbody>
            </table>
        </div>
    `;
    openPopup(`📊 ${agent.code}`, html, `<button class="popup-button gray" onclick="displayStatisticsMenu()">Fermer</button>`);
}

function showWorkedDaysMenu() {
    const html = `
        <div class="info-section">
            <h3>Jours Travaillés</h3>
            <div class="form-group"><label>Période</label><select id="workedDaysPeriod">
                <option value="current_month">Ce mois</option>
                <option value="last_month">Mois dernier</option>
                <option value="current_quarter">Ce trimestre</option>
                <option value="current_year">Cette année</option>
                <option value="custom">Personnalisée</option>
            </select></div>
            <div id="customDateRange" style="display:none;">
                <div class="form-group"><label>Date début</label><input type="date" id="customStartDate"></div>
                <div class="form-group"><label>Date fin</label><input type="date" id="customEndDate"></div>
            </div>
            <div class="form-group"><label>Groupe</label><select id="workedDaysGroup"><option value="ALL">Tous</option>${[...new Set(agents.filter(a=>a.statut==='actif').map(a=>a.groupe))].sort().map(g=>`<option value="${g}">Groupe ${g}</option>`).join('')}</select></div>
        </div>
    `;
    openPopup("📊 Jours Travaillés", html, `
        <button class="popup-button green" onclick="showWorkedDaysResults()">📊 Afficher</button>
        <button class="popup-button gray" onclick="displayStatisticsMenu()">Annuler</button>
    `);
    document.getElementById('workedDaysPeriod').addEventListener('change', function() {
        document.getElementById('customDateRange').style.display = this.value === 'custom' ? 'block' : 'none';
    });
}

function showWorkedDaysResults() {
    const period = document.getElementById('workedDaysPeriod').value;
    const group = document.getElementById('workedDaysGroup').value;
    const today = new Date();
    let start, end, periodText;
    if (period === 'custom') {
        start = new Date(document.getElementById('customStartDate').value);
        end = new Date(document.getElementById('customEndDate').value);
        if (isNaN(start) || isNaN(end)) { showSnackbar("⚠️ Dates invalides"); return; }
        periodText = `${start.toLocaleDateString()} - ${end.toLocaleDateString()}`;
    } else if (period === 'current_month') {
        start = new Date(today.getFullYear(), today.getMonth(), 1);
        end = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        periodText = `${getMonthName(today.getMonth() + 1)} ${today.getFullYear()}`;
    } else if (period === 'last_month') {
        start = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        end = new Date(today.getFullYear(), today.getMonth(), 0);
        periodText = `${getMonthName(today.getMonth())} ${today.getFullYear()}`;
    } else if (period === 'current_quarter') {
        const q = Math.floor(today.getMonth() / 3);
        start = new Date(today.getFullYear(), q * 3, 1);
        end = new Date(today.getFullYear(), (q + 1) * 3, 0);
        periodText = `T${q + 1} ${today.getFullYear()}`;
    } else {
        start = new Date(today.getFullYear(), 0, 1);
        end = new Date(today.getFullYear(), 11, 31);
        periodText = `Année ${today.getFullYear()}`;
    }
    let filtered = agents.filter(a => a.statut === 'actif');
    if (group !== 'ALL') filtered = filtered.filter(a => a.groupe === group);
    const results = filtered.map(agent => {
        let worked = 0, conges = 0, maladie = 0, autre = 0, feries = 0, totalJours = 0;
        let cur = new Date(start);
        while (cur <= end) {
            const dateStr = cur.toISOString().split('T')[0];
            const shift = getShiftForAgent(agent.code, dateStr);
            if (['1', '2', '3'].includes(shift)) worked++;
            if (shift === 'C') conges++;
            if (shift === 'M') maladie++;
            if (shift === 'A') autre++;
            if (isHolidayDate(cur) && !['R', 'M', 'A'].includes(shift)) feries++;
            totalJours++;
            cur.setDate(cur.getDate() + 1);
        }
        const totalGeneral = worked + feries + conges;
        return { ...agent, worked, conges, maladie, autre, feries, totalJours, totalGeneral,
                 rate: totalJours ? ((worked / totalJours) * 100).toFixed(1) : 0 };
    }).sort((a, b) => b.totalGeneral - a.totalGeneral);
    const html = `
        <div class="info-section">
            <h3>Classement - ${group === 'ALL' ? 'Tous les groupes' : 'Groupe ' + group}</h3>
            <p>Période: ${periodText}</p>
            <div style="overflow-x:auto;">
                <table style="width:100%; border-collapse:collapse;">
                    <thead><tr style="background-color:#2c3e50;"><th style="padding:8px; border:1px solid #555; text-align:center;">Rang</th><th style="padding:8px; border:1px solid #555; text-align:left;">Agent</th><th style="padding:8px; border:1px solid #555; text-align:center;">Groupe</th><th style="padding:8px; border:1px solid #555; text-align:center;">Travaillés</th><th style="padding:8px; border:1px solid #555; text-align:center;">Congés (C)</th><th style="padding:8px; border:1px solid #555; text-align:center;">Maladie (M)</th><th style="padding:8px; border:1px solid #555; text-align:center;">Autre (A)</th><th style="padding:8px; border:1px solid #555; text-align:center;">Jours fériés</th><th style="padding:8px; border:1px solid #555; text-align:center;">Total général</th></tr></thead>
                    <tbody>${results.map((a, i) => `<tr><td style="padding:6px; border:1px solid #555; text-align:center; font-weight:bold;" class="rank-${i+1}">${i+1}</td><td style="padding:6px; border:1px solid #555;">${a.nom} ${a.prenom}</td><td style="padding:6px; border:1px solid #555; text-align:center;">${a.groupe}</td><td style="padding:6px; border:1px solid #555; text-align:center;">${a.worked}</td><td style="padding:6px; border:1px solid #555; text-align:center;">${a.conges}</td><td style="padding:6px; border:1px solid #555; text-align:center;">${a.maladie}</td><td style="padding:6px; border:1px solid #555; text-align:center;">${a.autre}</td><td style="padding:6px; border:1px solid #555; text-align:center;">${a.feries}</td><td style="padding:6px; border:1px solid #555; text-align:center; font-weight:bold;">${a.totalGeneral}</td></tr>`).join('')}</tbody>
                </table>
            </div>
        </div>
    `;
    openPopup("📊 Classement", html, `<button class="popup-button gray" onclick="displayStatisticsMenu()">Fermer</button>`);
}

function showGroupStatsSelection() {
    const groups = [...new Set(agents.filter(a=>a.statut==='actif').map(a=>a.groupe))].sort();
    const html = `<div class="info-section"><h3>Statistiques par Groupe</h3><div class="form-group"><label>Groupe</label><select id="selectedGroupForStats"><option value="">Sélectionner</option>${groups.map(g=>`<option value="${g}">Groupe ${g}</option>`).join('')}<option value="ALL">Tous</option></select></div><div class="form-group"><label>Période</label><select id="groupStatsPeriod"><option value="current_month">Ce mois</option><option value="last_3_months">3 derniers mois</option><option value="current_quarter">Ce trimestre</option><option value="current_year">Cette année</option><option value="custom">Personnalisée</option></select></div><div id="customStatsPeriod" style="display:none"><div class="form-group"><label>Début</label><input type="date" id="statsStartDate" value="${new Date(new Date().getFullYear(), new Date().getMonth(),1).toISOString().split('T')[0]}"></div><div class="form-group"><label>Fin</label><input type="date" id="statsEndDate" value="${new Date().toISOString().split('T')[0]}"></div></div><div class="form-group"><label>Type</label><select id="groupAnalysisType"><option value="performance">Performance</option><option value="attendance">Présence/Absence</option><option value="shifts">Répartition shifts</option></select></div></div>`;
    openPopup("📉 Statistiques par Groupe", html, `
        <button class="popup-button green" onclick="showSelectedGroupStats()">📊 Voir</button>
        <button class="popup-button gray" onclick="displayStatisticsMenu()">Annuler</button>
    `);
    document.getElementById('groupStatsPeriod').addEventListener('change', function() {
        document.getElementById('customStatsPeriod').style.display = this.value === 'custom' ? 'block' : 'none';
    });
}

function showSelectedGroupStats() {
    const group = document.getElementById('selectedGroupForStats').value;
    const period = document.getElementById('groupStatsPeriod').value;
    const analysis = document.getElementById('groupAnalysisType').value;
    if (!group) { showSnackbar("⚠️ Sélectionnez un groupe"); return; }
    const today = new Date();
    let start, end;
    if (period === 'custom') {
        start = new Date(document.getElementById('statsStartDate').value);
        end = new Date(document.getElementById('statsEndDate').value);
    } else if (period === 'current_month') {
        start = new Date(today.getFullYear(), today.getMonth(), 1);
        end = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    } else if (period === 'last_3_months') {
        start = new Date(today.getFullYear(), today.getMonth() - 3, 1);
        end = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    } else if (period === 'current_quarter') {
        const q = Math.floor(today.getMonth() / 3);
        start = new Date(today.getFullYear(), q * 3, 1);
        end = new Date(today.getFullYear(), (q + 1) * 3, 0);
    } else {
        start = new Date(today.getFullYear(), 0, 1);
        end = new Date(today.getFullYear(), 11, 31);
    }
    let agentsGroup = group === 'ALL' ? agents.filter(a => a.statut === 'actif') : agents.filter(a => a.groupe === group && a.statut === 'actif');
    if (!agentsGroup.length) { showSnackbar("⚠️ Aucun agent dans ce groupe"); return; }
    const stats = agentsGroup.map(agent => {
        let worked = 0, total = 0, conges = 0, sick = 0, other = 0, feries = 0;
        let cur = new Date(start);
        const shifts = { 1: 0, 2: 0, 3: 0, R: 0, C: 0, M: 0, A: 0 };
        while (cur <= end) {
            const dateStr = cur.toISOString().split('T')[0];
            const shift = getShiftForAgent(agent.code, dateStr);
            shifts[shift] = (shifts[shift] || 0) + 1;
            if (['1', '2', '3'].includes(shift)) worked++;
            if (shift === 'C') conges++;
            if (shift === 'M') sick++;
            if (shift === 'A') other++;
            total++;
            cur.setDate(cur.getDate() + 1);
        }
        let curF = new Date(start);
        while (curF <= end) {
            if (isHolidayDate(curF)) {
                const shift = getShiftForAgent(agent.code, curF.toISOString().split('T')[0]);
                if (!['R', 'M', 'A'].includes(shift)) feries++;
            }
            curF.setDate(curF.getDate() + 1);
        }
        return { agent, worked, total, conges, sick, other, feries, shifts, rate: total ? ((worked / total) * 100).toFixed(1) : 0 };
    }).sort((a, b) => b.rate - a.rate);
    if (analysis === 'performance') {
        const html = `<div class="info-section"><h3>Performance ${group === 'ALL' ? 'Tous les groupes' : 'Groupe ' + group}</h3><p>Période: ${start.toLocaleDateString()} - ${end.toLocaleDateString()}</p><div style="overflow-x:auto;"><table class="classement-table" style="width:100%; border-collapse:collapse;"><thead><tr style="background-color:#34495e;"><th style="padding:8px; border:1px solid #2c3e50; text-align:center;">Rang</th><th style="padding:8px; border:1px solid #2c3e50; text-align:left;">Agent</th><th style="padding:8px; border:1px solid #2c3e50; text-align:center;">Groupe</th><th style="padding:8px; border:1px solid #2c3e50; text-align:center;">Travaillés</th><th style="padding:8px; border:1px solid #2c3e50; text-align:center;">Congés</th><th style="padding:8px; border:1px solid #2c3e50; text-align:center;">Maladie</th><th style="padding:8px; border:1px solid #2c3e50; text-align:center;">Fériés</th><th style="padding:8px; border:1px solid #2c3e50; text-align:center;">Total global</th></tr></thead><tbody>${stats.map((s, i) => { const totalGlobal = s.worked + s.conges + s.feries; return `<tr><td style="padding:6px; border:1px solid #2c3e50; text-align:center; font-weight:bold;" class="rank-${i + 1}">${i + 1}</td><td style="padding:6px; border:1px solid #2c3e50;">${s.agent.nom} ${s.agent.prenom}</td><td style="padding:6px; border:1px solid #2c3e50; text-align:center;">${s.agent.groupe}</td><td style="padding:6px; border:1px solid #2c3e50; text-align:center;">${s.worked}/${s.total}</td><td style="padding:6px; border:1px solid #2c3e50; text-align:center;">${s.conges}</td><td style="padding:6px; border:1px solid #2c3e50; text-align:center;">${s.sick}</td><td style="padding:6px; border:1px solid #2c3e50; text-align:center;">${s.feries}</td><td style="padding:6px; border:1px solid #2c3e50; text-align:center; font-weight:bold; background-color:#27ae60;">${totalGlobal}</td></tr>` }).join('')}</tbody></table></div></div>`;
        openPopup(`📊 Performance`, html, `<button class="popup-button gray" onclick="displayStatisticsMenu()">Fermer</button>`);
    } else if (analysis === 'attendance') {
        const html = `<div class="info-section"><h3>Présence/Absence ${group === 'ALL' ? 'Tous les groupes' : 'Groupe ' + group}</h3><p>Période: ${start.toLocaleDateString()} - ${end.toLocaleDateString()}</p><div style="overflow-x:auto;"><table class="classement-table" style="width:100%; border-collapse:collapse;"><thead><tr style="background-color:#34495e;"><th style="padding:8px; border:1px solid #2c3e50; text-align:left;">Agent</th><th style="padding:8px; border:1px solid #2c3e50; text-align:center;">Groupe</th><th style="padding:8px; border:1px solid #2c3e50; text-align:center;">Travaillés</th><th style="padding:8px; border:1px solid #2c3e50; text-align:center;">Congés</th><th style="padding:8px; border:1px solid #2c3e50; text-align:center;">Maladie</th><th style="padding:8px; border:1px solid #2c3e50; text-align:center;">Autre absence</th><th style="padding:8px; border:1px solid #2c3e50; text-align:center;">Taux présence</th></tr></thead><tbody>${stats.map(s => `<tr><td style="padding:6px; border:1px solid #2c3e50;">${s.agent.nom} ${s.agent.prenom}</td><td style="padding:6px; border:1px solid #2c3e50; text-align:center;">${s.agent.groupe}</td><td style="padding:6px; border:1px solid #2c3e50; text-align:center;">${s.worked}/${s.total}</td><td style="padding:6px; border:1px solid #2c3e50; text-align:center;">${s.conges}</td><td style="padding:6px; border:1px solid #2c3e50; text-align:center;">${s.sick}</td><td style="padding:6px; border:1px solid #2c3e50; text-align:center;">${s.other}</td><td style="padding:6px; border:1px solid #2c3e50; text-align:center; font-weight:bold;">${s.rate}%</td></tr>`).join('')}</tbody></table></div></div>`;
        openPopup(`📊 Présence/Absence`, html, `<button class="popup-button gray" onclick="displayStatisticsMenu()">Fermer</button>`);
    } else {
        const html = `<div class="info-section"><h3>Répartition des Shifts ${group === 'ALL' ? 'Tous les groupes' : 'Groupe ' + group}</h3><p>Période: ${start.toLocaleDateString()} - ${end.toLocaleDateString()}</p><div style="overflow-x:auto;"><table class="classement-table" style="width:100%; border-collapse:collapse;"><thead><tr style="background-color:#34495e;"><th style="padding:8px; border:1px solid #2c3e50; text-align:left;">Agent</th><th style="padding:8px; border:1px solid #2c3e50; text-align:center;">Groupe</th><th style="padding:8px; border:1px solid #2c3e50; text-align:center;">Matin (1)</th><th style="padding:8px; border:1px solid #2c3e50; text-align:center;">Après-midi (2)</th><th style="padding:8px; border:1px solid #2c3e50; text-align:center;">Nuit (3)</th><th style="padding:8px; border:1px solid #2c3e50; text-align:center;">Repos (R)</th><th style="padding:8px; border:1px solid #2c3e50; text-align:center;">Congés (C)</th><th style="padding:8px; border:1px solid #2c3e50; text-align:center;">Maladie (M)</th></tr></thead><tbody>${stats.map(s => `<tr><td style="padding:6px; border:1px solid #2c3e50;">${s.agent.nom} ${s.agent.prenom}</td><td style="padding:6px; border:1px solid #2c3e50; text-align:center;">${s.agent.groupe}</td><td style="padding:6px; border:1px solid #2c3e50; text-align:center;">${s.shifts['1'] || 0}</td><td style="padding:6px; border:1px solid #2c3e50; text-align:center;">${s.shifts['2'] || 0}</td><td style="padding:6px; border:1px solid #2c3e50; text-align:center;">${s.shifts['3'] || 0}</td><td style="padding:6px; border:1px solid #2c3e50; text-align:center;">${s.shifts['R'] || 0}</td><td style="padding:6px; border:1px solid #2c3e50; text-align:center;">${s.shifts['C'] || 0}</td><td style="padding:6px; border:1px solid #2c3e50; text-align:center;">${s.shifts['M'] || 0}</td></tr>`).join('')}</tbody></table></div></div>`;
        openPopup(`📊 Répartition des Shifts`, html, `<button class="popup-button gray" onclick="displayStatisticsMenu()">Fermer</button>`);
    }
}

function generateFullReport() {
    const actifs = agents.filter(a=>a.statut==='actif');
    const inactifs = agents.filter(a=>a.statut==='inactif');
    const warningsActifs = warnings.filter(w=>w.status==='active').length;
    const html = `<div class="info-section"><h3>Rapport Complet</h3><div>Agents actifs: ${actifs.length}</div><div>Agents inactifs: ${inactifs.length}</div><div>Avertissements actifs: ${warningsActifs}</div><div>Radios: ${radios.length} (${radios.filter(r=>r.status==='DISPONIBLE').length} disponibles)</div><div>Habillement: ${uniforms.length} agents équipés</div><div>Codes panique: ${panicCodes.length}</div></div>`;
    openPopup("📋 Rapport Complet", html, `<button class="popup-button gray" onclick="displayStatisticsMenu()">Fermer</button>`);
}

// ==================== PARTIE 6B : CODES PANIQUE ====================

function displayPanicCodesMenu() {
    displaySubMenu("CODES PANIQUE", [
        { text: "➕ Ajouter Code", handler: showAddPanicCodeForm },
        { text: "✏️ Modifier Code", handler: showEditPanicCodeList },
        { text: "🗑️ Supprimer Code", handler: showDeletePanicCodeList },
        { text: "📋 Liste des Codes", handler: showPanicCodesList },
        { text: "🔍 Rechercher Code", handler: showSearchPanicCode },
        { text: "📤 Exporter Codes", handler: exportPanicCodes },
        { text: "↩️ Retour Menu Principal", handler: displayMainMenu, className: "back-button" }
    ]);
}

function showAddPanicCodeForm(agentCode = null) {
    const html = `
        <div class="info-section">
            <h3>➕ Ajouter Code Panique</h3>
            <div class="form-group"><label>Agent</label><select id="panicAgent">${agents.filter(a=>a.statut==='actif').map(a=>`<option value="${a.code}" ${agentCode===a.code?'selected':''}>${a.nom} ${a.prenom}</option>`).join('')}</select></div>
            <div class="form-group"><label>Code</label><input type="text" id="panicCodeValue" required maxlength="20"></div>
            <div class="form-group"><label>Poste/Secteur</label><input type="text" id="panicPoste"></div>
            <div class="form-group"><label>Commentaire</label><textarea id="panicComment" rows="3"></textarea></div>
        </div>
    `;
    openPopup("➕ Ajouter Code Panique", html, `
        <button class="popup-button green" onclick="savePanicCode()">🔐 Enregistrer</button>
        <button class="popup-button gray" onclick="showPanicCodesList()">Annuler</button>
    `);
}

function savePanicCode() {
    const agentCode = document.getElementById('panicAgent').value;
    const code = document.getElementById('panicCodeValue').value.toUpperCase();
    const poste = document.getElementById('panicPoste').value;
    const comment = document.getElementById('panicComment').value;
    if (!agentCode || !code) { showSnackbar("⚠️ Champs obligatoires"); return; }
    const idx = panicCodes.findIndex(p=>p.agent_code===agentCode);
    const panicData = { agent_code: agentCode, code, poste, comment, created_at: new Date().toISOString(), updated_at: new Date().toISOString() };
    if (idx!==-1) panicCodes[idx] = panicData;
    else panicCodes.push(panicData);
    saveData();
    showSnackbar(`✅ Code panique ${idx===-1?'ajouté':'mis à jour'} pour ${agentCode}`);
    showPanicCodesList();
    closePopup();
}

function showEditPanicCodeList() {
    if (!panicCodes.length) { showSnackbar("ℹ️ Aucun code"); return; }
    const html = `<div class="info-section"><h3>✏️ Modifier Code Panique</h3><div id="panicEditList">${generatePanicEditList()}</div></div>`;
    openPopup("✏️ Modifier Code", html, `<button class="popup-button gray" onclick="showPanicCodesList()">Retour</button>`);
}

function generatePanicEditList() {
    return `<table class="classement-table"><thead><tr><th>Agent</th><th>Code</th><th>Action</th></tr></thead><tbody>${panicCodes.map(p=>{ const agent = agents.find(a=>a.code===p.agent_code); return `<tr><td>${agent?agent.nom+' '+agent.prenom:p.agent_code}</td><td>${p.code}</td><td><button class="action-btn small blue" onclick="showEditPanicCode('${p.agent_code}')">✏️</button></td></tr>`; }).join('')}</tbody></table>`;
}

function showEditPanicCode(agentCode) {
    const p = panicCodes.find(p=>p.agent_code===agentCode);
    if (!p) return;
    const html = `
        <div class="info-section">
            <h3>✏️ Modifier Code - ${agentCode}</h3>
            <div class="form-group"><label>Code</label><input type="text" id="editPanicCode" value="${p.code}"></div>
            <div class="form-group"><label>Poste</label><input type="text" id="editPanicPoste" value="${p.poste||''}"></div>
            <div class="form-group"><label>Commentaire</label><textarea id="editPanicComment" rows="3">${p.comment||''}</textarea></div>
        </div>
    `;
    openPopup(`✏️ Modifier ${agentCode}`, html, `
        <button class="popup-button green" onclick="updatePanicCode('${agentCode}')">💾 Enregistrer</button>
        <button class="popup-button gray" onclick="showPanicCodesList()">Annuler</button>
    `);
}

function updatePanicCode(agentCode) {
    const idx = panicCodes.findIndex(p=>p.agent_code===agentCode);
    if (idx===-1) return;
    panicCodes[idx].code = document.getElementById('editPanicCode').value.toUpperCase();
    panicCodes[idx].poste = document.getElementById('editPanicPoste').value;
    panicCodes[idx].comment = document.getElementById('editPanicComment').value;
    panicCodes[idx].updated_at = new Date().toISOString();
    saveData();
    showSnackbar(`✅ Code mis à jour pour ${agentCode}`);
    showPanicCodesList();
    closePopup();
}

function showDeletePanicCodeList() {
    if (!panicCodes.length) { showSnackbar("ℹ️ Aucun code"); return; }
    const html = `<div class="info-section"><h3>🗑️ Supprimer Code</h3><table class="classement-table"><thead><tr><th>Agent</th><th>Code</th><th>Action</th> </thead><tbody>${panicCodes.map(p=>{ const agent = agents.find(a=>a.code===p.agent_code); return `<tr><td>${agent?agent.nom+' '+agent.prenom:p.agent_code}</td><td>${p.code}</td><td><button class="action-btn small red" onclick="deletePanicCode('${p.agent_code}')">🗑️</button></td></tr>`; }).join('')}</tbody></table></div>`;
    openPopup("🗑️ Supprimer Code", html, `<button class="popup-button gray" onclick="displayPanicCodesMenu()">Retour</button>`);
}

function deletePanicCode(agentCode) {
    if (confirm(`Supprimer le code de ${agentCode} ?`)) {
        const idx = panicCodes.findIndex(p=>p.agent_code===agentCode);
        if (idx!==-1) { panicCodes.splice(idx,1); saveData(); showSnackbar("✅ Supprimé"); showPanicCodesList(); }
    }
}

function showPanicCodesList() {
    if (!panicCodes.length) {
        openPopup("🚨 Codes Panique", "<p>Aucun code</p>", `<button class="popup-button green" onclick="showAddPanicCodeForm()">➕ Ajouter</button><button class="popup-button gray" onclick="displayPanicCodesMenu()">Retour</button>`);
        return;
    }
    const html = `<div class="info-section"><h3>🚨 Liste des Codes</h3><table class="classement-table"><thead><tr><th>Agent</th><th>Code</th><th>Poste</th><th>Date</th><th>Actions</th> </thead><tbody>${panicCodes.map(p=>{ const agent = agents.find(a=>a.code===p.agent_code); return `<tr><td>${agent?agent.nom+' '+agent.prenom:p.agent_code}</td><td><span style="color:#e74c3c">${p.code}</span></td><td>${p.poste||'-'}</td><td>${new Date(p.created_at).toLocaleDateString()}</td><td><button class="action-btn small blue" onclick="showEditPanicCode('${p.agent_code}')">✏️</button><button class="action-btn small red" onclick="deletePanicCode('${p.agent_code}')">🗑️</button></td></tr>`; }).join('')}</tbody></table></div>`;
    openPopup("🚨 Codes Panique", html, `<button class="popup-button green" onclick="showAddPanicCodeForm()">➕ Ajouter</button><button class="popup-button blue" onclick="exportPanicCodes()">📤 Exporter</button><button class="popup-button gray" onclick="displayPanicCodesMenu()">Retour</button>`);
}

function showSearchPanicCode() {
    const html = `<div class="info-section"><h3>🔍 Rechercher</h3><div class="form-group"><input type="text" id="searchPanicInput" placeholder="Nom ou code..." onkeyup="searchPanicCode()"></div><div id="searchPanicResult"></div></div>`;
    openPopup("🔍 Rechercher Code", html, `<button class="popup-button gray" onclick="displayPanicCodesMenu()">Retour</button>`);
}

function searchPanicCode() {
    const term = document.getElementById('searchPanicInput').value.toLowerCase();
    if (!term) { document.getElementById('searchPanicResult').innerHTML = ''; return; }
    const results = panicCodes.filter(p=>{
        const agent = agents.find(a=>a.code===p.agent_code);
        return p.code.toLowerCase().includes(term) || p.agent_code.toLowerCase().includes(term) || (agent && (agent.nom.toLowerCase().includes(term) || agent.prenom.toLowerCase().includes(term)));
    });
    if (!results.length) { document.getElementById('searchPanicResult').innerHTML = '<p>Aucun résultat</p>'; return; }
    const html = `<table class="classement-table"><thead><tr><th>Agent</th><th>Code</th><th>Poste</th><th>Date</th> </thead><tbody>${results.map(p=>{ const agent = agents.find(a=>a.code===p.agent_code); return `<tr><td>${agent?agent.nom+' '+agent.prenom:p.agent_code}</td><td>${p.code}</td><td>${p.poste||'-'}</td><td>${new Date(p.created_at).toLocaleDateString()}</td>`; }).join('')}</tbody></table>`;
    document.getElementById('searchPanicResult').innerHTML = html;
}

function exportPanicCodes() {
    if (!panicCodes.length) { showSnackbar("ℹ️ Aucun code"); return; }
    let csv = "Codes Panique\n\nAgent;Code Agent;Code;Poste;Commentaire;Date\n";
    panicCodes.forEach(p=>{
        const agent = agents.find(a=>a.code===p.agent_code);
        csv += `${agent?agent.nom+' '+agent.prenom:''};${p.agent_code};${p.code};"${p.poste||''}";"${p.comment||''}";${p.created_at}\n`;
    });
    downloadCSV(csv, `Codes_Panique_${new Date().toISOString().split('T')[0]}.csv`);
    showSnackbar("✅ Export codes");
}

// ==================== PARTIE 6C : GESTION RADIOS ====================
// (Copiez ici vos fonctions de gestion des radios depuis votre version fonctionnelle)
// Pour gagner de la place, je ne les réécris pas, mais elles doivent être présentes.
// Si besoin, dites-le moi et je les fournis.

// ==================== PARTIE 6D : HABILLEMENT ====================
// (Copiez ici vos fonctions de gestion de l'habillement)

// ==================== PARTIE 6E : AVERTISSEMENTS ====================
// (Copiez ici vos fonctions de gestion des avertissements)

// ==================== PARTIE 6F : JOURS FÉRIÉS ====================
// (Copiez ici vos fonctions de gestion des jours fériés)




// ==================== PARTIE 8 : GESTION RADIOS ====================

function displayRadiosMenu() {
    displaySubMenu("GESTION RADIOS", [
        { text: "➕ Ajouter Radio", handler: showAddRadioForm },
        { text: "✏️ Modifier Radio", handler: showEditRadioList },
        { text: "📋 Liste des Radios", handler: showRadiosList },
        { text: "📲 Attribuer Radio", handler: showAssignRadioForm },
        { text: "🔄 Retour Radio", handler: showReturnRadioForm },
        { text: "📊 Statut Radios", handler: showRadiosStatus },
        { text: "📋 Historique", handler: showRadiosHistory },
        { text: "↩️ Retour Menu Principal", handler: displayMainMenu, className: "back-button" }
    ]);
}

function showAddRadioForm() {
    const html = `
        <div class="info-section">
            <h3>➕ Ajouter Radio</h3>
            <form id="addRadioForm" onsubmit="return saveNewRadio(event)">
                <div class="form-group"><label>ID *</label><input type="text" id="radioId" required></div>
                <div class="form-group"><label>Modèle *</label><input type="text" id="radioModel" required></div>
                <div class="form-group"><label>Numéro série</label><input type="text" id="radioSerial"></div>
                <div class="form-group"><label>Statut</label><select id="radioStatus"><option value="DISPONIBLE">Disponible</option><option value="ATTRIBUEE">Attribuée</option><option value="HS">HS</option><option value="REPARATION">Réparation</option><option value="PERDUE">Perdue</option></select></div>
                <div class="form-group"><label>Date acquisition</label><input type="date" id="radioAcquisitionDate" value="${new Date().toISOString().split('T')[0]}"></div>
                <div class="form-group"><label>Prix (DH)</label><input type="number" id="radioPrice" step="0.01"></div>
                <div class="form-group"><label>Commentaires</label><textarea id="radioComments" rows="3"></textarea></div>
            </form>
        </div>
    `;
    openPopup("➕ Ajouter Radio", html, `
        <button class="popup-button green" onclick="document.getElementById('addRadioForm').submit()">💾 Enregistrer</button>
        <button class="popup-button gray" onclick="showRadiosList()">Annuler</button>
    `);
}

function saveNewRadio(event) {
    event.preventDefault();
    const id = document.getElementById('radioId').value.toUpperCase();
    const model = document.getElementById('radioModel').value;
    const serial = document.getElementById('radioSerial').value;
    const status = document.getElementById('radioStatus').value;
    const acquisitionDate = document.getElementById('radioAcquisitionDate').value;
    const price = document.getElementById('radioPrice').value;
    const comments = document.getElementById('radioComments').value;
    if (!id || !model || !status) { showSnackbar("⚠️ Champs obligatoires"); return false; }
    if (radios.find(r=>r.id===id)) { showSnackbar(`⚠️ Radio ${id} existe`); return false; }
    radios.push({
        id, model, serial, status, acquisitionDate, price: price?parseFloat(price):null, comments,
        createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
        history: [{ date: new Date().toISOString(), action: 'CREATION', details: `Radio créée - Statut: ${status}`, user: 'Admin' }]
    });
    saveData();
    showSnackbar(`✅ Radio ${id} ajoutée`);
    showRadiosList();
    closePopup();
    return false;
}

function showEditRadioList() {
    const html = `<div class="info-section"><h3>✏️ Modifier Radio</h3><input type="text" id="searchRadioEdit" placeholder="Rechercher..." onkeyup="filterRadiosEdit()"><div id="radioEditList">${generateRadioEditList()}</div></div>`;
    openPopup("✏️ Modifier Radio", html, `<button class="popup-button gray" onclick="showRadiosList()">Retour</button>`);
}

function generateRadioEditList() {
    if (!radios.length) return '<p>Aucune radio</p>';
    return `<table class="classement-table"><thead><tr><th>ID</th><th>Modèle</th><th>Statut</th><th>Action</th> </thead><tbody>${radios.map(r=>`<tr<td>${r.id}</td<td>${r.model}</td<td><span class="status-badge ${r.status==='DISPONIBLE'?'active':r.status==='ATTRIBUEE'?'warning':'inactive'}">${r.status}</span></td<td><button class="action-btn small blue" onclick="showEditRadioForm('${r.id}')">✏️</button></td></tr>`).join('')}</tbody>}`;
}

function showEditRadioForm(radioId) {
    const radio = radios.find(r=>r.id===radioId);
    if (!radio) { showSnackbar("⚠️ Radio non trouvée"); return; }
    const html = `
        <div class="info-section">
            <h3>✏️ Modifier Radio ${radioId}</h3>
            <form id="editRadioForm" onsubmit="return updateRadio('${radioId}', event)">
                <div class="form-group"><label>ID</label><input type="text" value="${radio.id}" readonly></div>
                <div class="form-group"><label>Modèle</label><input type="text" id="editRadioModel" value="${radio.model}" required></div>
                <div class="form-group"><label>Série</label><input type="text" id="editRadioSerial" value="${radio.serial||''}"></div>
                <div class="form-group"><label>Statut</label><select id="editRadioStatus"><option value="DISPONIBLE" ${radio.status==='DISPONIBLE'?'selected':''}>Disponible</option><option value="ATTRIBUEE" ${radio.status==='ATTRIBUEE'?'selected':''}>Attribuée</option><option value="HS" ${radio.status==='HS'?'selected':''}>HS</option><option value="REPARATION" ${radio.status==='REPARATION'?'selected':''}>Réparation</option><option value="PERDUE" ${radio.status==='PERDUE'?'selected':''}>Perdue</option></select></div>
                <div class="form-group"><label>Prix</label><input type="number" id="editRadioPrice" value="${radio.price||''}" step="0.01"></div>
                <div class="form-group"><label>Commentaires</label><textarea id="editRadioComments" rows="3">${radio.comments||''}</textarea></div>
                <div class="form-group"><label>Motif modification</label><input type="text" id="editRadioReason" required></div>
            </form>
        </div>
    `;
    openPopup(`✏️ Modifier Radio ${radioId}`, html, `
        <button class="popup-button green" onclick="document.getElementById('editRadioForm').submit()">💾 Enregistrer</button>
        <button class="popup-button gray" onclick="closePopup()">Annuler</button>
    `);
}

function updateRadio(radioId, event) {
    event.preventDefault();
    const idx = radios.findIndex(r=>r.id===radioId);
    if (idx===-1) { showSnackbar("⚠️ Radio non trouvée"); return false; }
    const oldStatus = radios[idx].status;
    const newStatus = document.getElementById('editRadioStatus').value;
    const reason = document.getElementById('editRadioReason').value;
    radios[idx] = {
        ...radios[idx],
        model: document.getElementById('editRadioModel').value,
        serial: document.getElementById('editRadioSerial').value,
        status: newStatus,
        price: document.getElementById('editRadioPrice').value ? parseFloat(document.getElementById('editRadioPrice').value) : null,
        comments: document.getElementById('editRadioComments').value,
        updatedAt: new Date().toISOString()
    };
    if (oldStatus !== newStatus) {
        if (!radios[idx].history) radios[idx].history = [];
        radios[idx].history.push({ date: new Date().toISOString(), action: 'STATUT_CHANGE', details: `Statut changé de ${oldStatus} à ${newStatus} - Raison: ${reason}`, user: 'Admin' });
    }
    saveData();
    showSnackbar(`✅ Radio ${radioId} mise à jour`);
    closePopup();
    showRadiosList();
    return false;
}

function showRadiosList() {
    if (!radios.length) {
        openPopup("📻 Radios", "<p>Aucune radio</p>", `<button class="popup-button green" onclick="showAddRadioForm()">➕ Ajouter</button><button class="popup-button gray" onclick="displayRadiosMenu()">Retour</button>`);
        return;
    }
    const stats = { total: radios.length, disponible: radios.filter(r=>r.status==='DISPONIBLE').length, attribuee: radios.filter(r=>r.status==='ATTRIBUEE').length, hs: radios.filter(r=>r.status==='HS').length };
    const html = `<div class="info-section"><h3>📻 Inventaire Radios</h3><div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;"><div>Total: ${stats.total}</div><div>Disponibles: ${stats.disponible}</div><div>Attribuées: ${stats.attribuee}</div><div>HS/Réparation: ${stats.hs+radios.filter(r=>r.status==='REPARATION').length}</div></div><input type="text" id="searchRadioList" placeholder="Rechercher..." onkeyup="filterRadioList()"><div id="radioListContainer">${generateRadioListTable()}</div></div>`;
    openPopup("📻 Radios", html, `<button class="popup-button green" onclick="showAddRadioForm()">➕ Ajouter</button><button class="popup-button blue" onclick="showRadiosStatus()">📊 Statut</button><button class="popup-button gray" onclick="displayRadiosMenu()">Retour</button>`);
}

function generateRadioListTable() {
    const statusColors = { DISPONIBLE:'#27ae60', ATTRIBUEE:'#f39c12', HS:'#e74c3c', REPARATION:'#e67e22', PERDUE:'#95a5a6' };
    return `<table class="classement-table"><thead><tr><th>ID</th><th>Modèle</th><th>Série</th><th>Statut</th><th>Prix</th><th>Actions</th> </thead><tbody>${radios.map(r=>`<tr<td>${r.id}</td<td>${r.model}</td<td>${r.serial||'-'}</td<td><span style="background:${statusColors[r.status]};color:white;padding:2px 8px;border-radius:12px;">${r.status}</span></td<td>${r.price?r.price+' DH':'-'}</td<td><button class="action-btn small blue" onclick="showEditRadioForm('${r.id}')">✏️</button>${r.status==='DISPONIBLE'?`<button class="action-btn small green" onclick="showAssignRadioForm('${r.id}')">📲</button>`:''}${r.status==='ATTRIBUEE'?`<button class="action-btn small orange" onclick="showReturnRadioForm('${r.id}')">🔄</button>`:''}<button class="action-btn small red" onclick="deleteRadioConfirm('${r.id}')">🗑️</button></td></tr>`).join('')}</tbody>}`;
}

function showAssignRadioForm(radioId, preSelectedAgentCode = null) {
    const radio = radios.find(r=>r.id===radioId);
    if (!radio || radio.status !== 'DISPONIBLE') { showSnackbar("⚠️ Radio non disponible"); return; }
    const html = `
        <div class="info-section">
            <h3>📲 Attribuer Radio ${radioId}</h3>
            <form id="assignRadioForm" onsubmit="return assignRadioToAgent('${radioId}', event)">
                <div class="form-group"><label>Radio</label><input type="text" value="${radioId} - ${radio.model}" readonly></div>
                <div class="form-group"><label>Agent *</label><select id="assignAgent" required>${agents.filter(a=>a.statut==='actif').map(a=>`<option value="${a.code}" ${preSelectedAgentCode===a.code?'selected':''}>${a.nom} ${a.prenom}</option>`).join('')}</select></div>
                <div class="form-group"><label>Date *</label><input type="date" id="assignDate" value="${new Date().toISOString().split('T')[0]}" required></div>
                <div class="form-group"><label>Commentaires</label><textarea id="assignComments" rows="3"></textarea></div>
            </form>
        </div>
    `;
    openPopup(`📲 Attribuer Radio ${radioId}`, html, `
        <button class="popup-button green" onclick="document.getElementById('assignRadioForm').submit()">✅ Attribuer</button>
        <button class="popup-button gray" onclick="showRadiosList()">Annuler</button>
    `);
}

function assignRadioToAgent(radioId, event) {
    event.preventDefault();
    const agentCode = document.getElementById('assignAgent').value;
    const assignDate = document.getElementById('assignDate').value;
    const comments = document.getElementById('assignComments').value;
    if (!agentCode || !assignDate) { showSnackbar("⚠️ Champs obligatoires"); return false; }
    const idx = radios.findIndex(r=>r.id===radioId);
    if (idx===-1) { showSnackbar("⚠️ Radio non trouvée"); return false; }
    radios[idx].status = 'ATTRIBUEE';
    radios[idx].attributed_to = agentCode;
    radios[idx].attribution_date = assignDate;
    radios[idx].attribution_comments = comments;
    radios[idx].updatedAt = new Date().toISOString();
    if (!radios[idx].history) radios[idx].history = [];
    radios[idx].history.push({ date: new Date().toISOString(), action: 'ATTRIBUTION', details: `Attribuée à ${agentCode}`, user: 'Admin' });
    saveData();
    showSnackbar(`✅ Radio ${radioId} attribuée`);
    closePopup();
    showRadiosList();
    return false;
}

function showReturnRadioForm(radioId) {
    const radio = radios.find(r=>r.id===radioId);
    if (!radio || radio.status !== 'ATTRIBUEE') { showSnackbar("⚠️ Radio non attribuée"); return; }
    const agent = agents.find(a=>a.code===radio.attributed_to);
    const html = `
        <div class="info-section">
            <h3>🔄 Retour Radio ${radioId}</h3>
            <form id="returnRadioForm" onsubmit="return returnRadioFromAgent('${radioId}', event)">
                <div class="form-group"><label>Radio</label><input type="text" value="${radioId} - ${radio.model}" readonly></div>
                <div class="form-group"><label>Attribuée à</label><input type="text" value="${agent?agent.nom+' '+agent.prenom:radio.attributed_to}" readonly></div>
                <div class="form-group"><label>Date retour</label><input type="date" id="returnDate" required value="${new Date().toISOString().split('T')[0]}"></div>
                <div class="form-group"><label>État</label><select id="returnCondition"><option value="BON">Bon état</option><option value="LEGER_USURE">Légère usure</option><option value="DOMMAGE">Dommage mineur</option><option value="HS">HS</option></select></div>
                <div class="form-group"><label>Nouveau statut</label><select id="newStatus"><option value="DISPONIBLE">Disponible</option><option value="REPARATION">Réparation</option><option value="HS">HS</option></select></div>
                <div class="form-group"><label>Commentaires</label><textarea id="returnComments" rows="3"></textarea></div>
            </form>
        </div>
    `;
    openPopup(`🔄 Retour Radio ${radioId}`, html, `
        <button class="popup-button green" onclick="document.getElementById('returnRadioForm').submit()">✅ Enregistrer</button>
        <button class="popup-button gray" onclick="showRadiosList()">Annuler</button>
    `);
}

function returnRadioFromAgent(radioId, event) {
    event.preventDefault();
    const idx = radios.findIndex(r=>r.id===radioId);
    if (idx===-1) return false;
    const returnDate = document.getElementById('returnDate').value;
    const condition = document.getElementById('returnCondition').value;
    const newStatus = document.getElementById('newStatus').value;
    const comments = document.getElementById('returnComments').value;
    const oldAssigned = radios[idx].attributed_to;
    radios[idx].status = newStatus;
    radios[idx].return_date = returnDate;
    radios[idx].return_condition = condition;
    radios[idx].return_comments = comments;
    radios[idx].attributed_to = null;
    radios[idx].updatedAt = new Date().toISOString();
    if (!radios[idx].history) radios[idx].history = [];
    radios[idx].history.push({ date: new Date().toISOString(), action: 'RETOUR', details: `Retournée par ${oldAssigned} - État: ${condition}`, user: 'Admin' });
    saveData();
    showSnackbar(`✅ Radio ${radioId} retournée`);
    closePopup();
    showRadiosList();
    return false;
}

function showRadiosStatus() {
    const total = radios.length;
    const disponible = radios.filter(r=>r.status==='DISPONIBLE').length;
    const attribuee = radios.filter(r=>r.status==='ATTRIBUEE').length;
    const hs = radios.filter(r=>r.status==='HS').length;
    const reparation = radios.filter(r=>r.status==='REPARATION').length;
    const totalValue = radios.reduce((s,r)=>s+(r.price||0),0);
    const html = `<div class="info-section"><h3>📊 Statut Radios</h3><div>Total: ${total}</div><div>Disponibles: ${disponible}</div><div>Attribuées: ${attribuee}</div><div>HS: ${hs}</div><div>Réparation: ${reparation}</div><div>Valeur totale: ${totalValue.toLocaleString()} DH</div></div>`;
    openPopup("📊 Statut Radios", html, `<button class="popup-button gray" onclick="showRadiosList()">Retour</button>`);
}

function showRadiosHistory() {
    const events = [];
    radios.forEach(r=>{
        if (r.history) r.history.forEach(e=>events.push({...e, radioId: r.id, radioModel: r.model}));
    });
    events.sort((a,b)=>new Date(b.date)-new Date(a.date));
    if (!events.length) { showSnackbar("ℹ️ Aucun historique"); return; }
    const html = `<div class="info-section"><h3>📋 Historique Radios</h3><table class="classement-table"><thead>汽<th>Date</th><th>Radio</th><th>Action</th><th>Détails</th> </thead><tbody>${events.map(e=>`<tr<td nowrap>${new Date(e.date).toLocaleString()}</td<td>${e.radioId} (${e.radioModel||''})</td<td>${e.action}</td<td>${e.details||''}</td></tr>`).join('')}</tbody>}</div>`;
    openPopup("📋 Historique Radios", html, `<button class="popup-button gray" onclick="showRadiosList()">Retour</button>`);
}

function deleteRadioConfirm(radioId) {
    if (confirm(`Supprimer radio ${radioId} ?`)) {
        const idx = radios.findIndex(r=>r.id===radioId);
        if (idx!==-1) { radios.splice(idx,1); saveData(); showSnackbar(`✅ Radio ${radioId} supprimée`); showRadiosList(); }
    }
}

function filterRadioList() {
    const term = document.getElementById('searchRadioList')?.value.toLowerCase()||'';
    const filtered = radios.filter(r=>r.id.toLowerCase().includes(term)||r.model.toLowerCase().includes(term));
    document.getElementById('radioListContainer').innerHTML = filtered.length ? generateRadioListTable() : '<p>Aucune radio trouvée</p>';
}

function filterRadiosEdit() {
    const term = document.getElementById('searchRadioEdit')?.value.toLowerCase()||'';
    const filtered = radios.filter(r=>r.id.toLowerCase().includes(term)||r.model.toLowerCase().includes(term));
    document.getElementById('radioEditList').innerHTML = filtered.length ? generateRadioEditList() : '<p>Aucune radio trouvée</p>';
}

// ==================== PARTIE 9 : HABILLEMENT ====================

function displayUniformMenu() {
    displaySubMenu("HABILLEMENT", [
        { text: "➕ Enregistrer Habillement", handler: showAddUniformForm },
        { text: "✏️ Modifier Habillement", handler: showEditUniformList },
        { text: "📋 Rapport Habillement", handler: showUniformReport },
        { text: "📊 Statistiques Tailles", handler: showUniformStats },
        { text: "📅 Échéances", handler: showUniformDeadlines },
        { text: "📤 Exporter Rapport", handler: exportUniformReport },
        { text: "↩️ Retour Menu Principal", handler: displayMainMenu, className: "back-button" }
    ]);
}

function showAddUniformForm() {
    const items = ['Chemise', 'Pantalon', 'Tricot', 'Ceinture', 'Chaussures', 'Cravate', 'Veste', 'Parka'];
    const sizeOptions = (item) => {
        if (item === 'Pantalon' || item === 'Chaussures') {
            return Array.from({length:20},(_,i)=>i+35).map(s=>`<option value="${s}">${s}</option>`).join('');
        } else if (item === 'Ceinture') {
            return Array.from({length:15},(_,i)=>i+70).map(s=>`<option value="${s}">${s}</option>`).join('');
        } else {
            return ['XS','S','M','L','XL','XXL','XXXL'].map(s=>`<option value="${s}">${s}</option>`).join('');
        }
    };
    const html = `
        <div class="info-section">
            <h3>👔 Enregistrer Habillement</h3>
            <div class="form-group"><label>Rechercher agent</label><input type="text" id="searchUniformAgent" onkeyup="filterUniformAgentList()"></div>
            <div class="form-group"><label>Agent *</label><select id="uniformAgent">${agents.filter(a=>a.statut==='actif').map(a=>`<option value="${a.code}">${a.nom} ${a.prenom}</option>`).join('')}</select></div>
            ${items.map(item => `
                <div style="background:#34495e;padding:10px;margin:10px 0;border-radius:5px;">
                    <h4>${item}</h4>
                    <div class="form-group"><label>Fourni</label><select id="uniform_${item.toLowerCase()}_fourni" onchange="toggleUniformFields('${item.toLowerCase()}')">
                        <option value="oui">Oui</option>
                        <option value="non">Non</option>
                    </select></div>
                    <div id="uniform_${item.toLowerCase()}_fields">
                        <div class="form-group"><label>Taille</label><select id="uniform_${item.toLowerCase()}_size">${sizeOptions(item)}</select></div>
                        <div class="form-group"><label>Date fourniture</label><input type="date" id="uniform_${item.toLowerCase()}_date" value="${new Date().toISOString().split('T')[0]}"></div>
                    </div>
                </div>
            `).join('')}
            <div class="form-group"><label>Commentaires</label><textarea id="uniformComments" rows="3"></textarea></div>
        </div>
    `;
    openPopup("👔 Enregistrer Habillement", html, `
        <button class="popup-button green" onclick="saveNewUniform()">💾 Enregistrer</button>
        <button class="popup-button gray" onclick="showUniformReport()">Annuler</button>
    `);
    items.forEach(item => {
        const fourni = document.getElementById(`uniform_${item.toLowerCase()}_fourni`);
        if (fourni) fourni.addEventListener('change', () => toggleUniformFields(item.toLowerCase()));
        toggleUniformFields(item.toLowerCase());
    });
}

function toggleUniformFields(item) {
    const fourni = document.getElementById(`uniform_${item}_fourni`)?.value;
    const fields = document.getElementById(`uniform_${item}_fields`);
    if (fields) fields.style.display = fourni === 'oui' ? 'block' : 'none';
}

function filterUniformAgentList() {
    const term = document.getElementById('searchUniformAgent').value.toLowerCase();
    const select = document.getElementById('uniformAgent');
    Array.from(select.options).forEach(opt=>opt.style.display = opt.text.toLowerCase().includes(term)?'':'none');
}

function saveNewUniform() {
    const agentCode = document.getElementById('uniformAgent').value;
    const items = ['chemise','pantalon','tricot','ceinture','chaussures','cravate','veste','parka'];
    const data = { agentCode, agentName: agents.find(a=>a.code===agentCode)?.nom+' '+agents.find(a=>a.code===agentCode)?.prenom || '', agentGroup: agents.find(a=>a.code===agentCode)?.groupe || '', comments: document.getElementById('uniformComments').value, lastUpdated: new Date().toISOString() };
    let ok = true;
    for (let item of items) {
        const fourni = document.getElementById(`uniform_${item}_fourni`).value;
        if (fourni === 'non') {
            data[item] = { fourni: false, size: null, date: null, needsRenewal: false };
            continue;
        }
        const size = document.getElementById(`uniform_${item}_size`).value;
        const date = document.getElementById(`uniform_${item}_date`).value;
        if (!size || !date) { ok=false; break; }
        const twoYearsAgo = new Date(); twoYearsAgo.setFullYear(twoYearsAgo.getFullYear()-2);
        data[item] = { fourni: true, size, date, needsRenewal: new Date(date) < twoYearsAgo };
    }
    if (!ok) { showSnackbar("⚠️ Tous les champs obligatoires pour les articles fournis"); return false; }
    const idx = uniforms.findIndex(u=>u.agentCode===agentCode);
    if (idx===-1) uniforms.push(data);
    else uniforms[idx] = { ...uniforms[idx], ...data };
    saveData();
    showSnackbar(`✅ Habillement enregistré pour ${agentCode}`);
    showUniformReport();
    closePopup();
    return false;
}

function showEditUniformList() {
    const html = `<div class="info-section"><h3>✏️ Modifier Habillement</h3><div id="uniformEditList">${generateUniformEditList()}</div></div>`;
    openPopup("✏️ Modifier Habillement", html, `<button class="popup-button gray" onclick="showUniformReport()">Retour</button>`);
}

function generateUniformEditList() {
    if (!uniforms.length) return '<p>Aucun habillement</p>';
    const items = ['chemise','pantalon','tricot','ceinture','chaussures','cravate','veste','parka'];
    return `<table class="classement-table"><thead><tr><th>Agent</th>${items.map(i=>`<th>${i.charAt(0).toUpperCase()+i.slice(1)}</th>`).join('')}<th>Actions</th> </thead><tbody>${uniforms.map(u=>{
        return `<tr<td>${u.agentName}<br><small>${u.agentCode}</small></td${items.map(i=>{
            const val = u[i];
            if (!val || !val.fourni) return `<td>Non fourni</td`;
            return `<td>${val.size}<br><small>${new Date(val.date).toLocaleDateString()}</small>${val.needsRenewal?'<br><span style="color:#e74c3c;">⚠️</span>':''}</td`;
        }).join('')}<td><button class="action-btn small blue" onclick="editUniform('${u.agentCode}')">✏️</button><button class="action-btn small red" onclick="deleteUniformConfirm('${u.agentCode}')">🗑️</button></td></tr>`;
    }).join('')}</tbody>}`;
}

function editUniform(agentCode) {
    const uniform = uniforms.find(u=>u.agentCode===agentCode);
    if (!uniform) return;
    showAddUniformForm();
    setTimeout(()=>{
        document.getElementById('uniformAgent').value = uniform.agentCode;
        ['chemise','pantalon','tricot','ceinture','chaussures','cravate','veste','parka'].forEach(item=>{
            const val = uniform[item];
            const fourniSelect = document.getElementById(`uniform_${item}_fourni`);
            if (fourniSelect) {
                fourniSelect.value = (val && val.fourni) ? 'oui' : 'non';
                toggleUniformFields(item);
            }
            if (val && val.fourni) {
                if(document.getElementById(`uniform_${item}_size`)) document.getElementById(`uniform_${item}_size`).value = val.size;
                if(document.getElementById(`uniform_${item}_date`)) document.getElementById(`uniform_${item}_date`).value = val.date;
            }
        });
        document.getElementById('uniformComments').value = uniform.comments || '';
    },100);
}

function deleteUniformConfirm(agentCode) {
    if (confirm(`Supprimer habillement de ${agentCode} ?`)) {
        const idx = uniforms.findIndex(u=>u.agentCode===agentCode);
        if (idx!==-1) { uniforms.splice(idx,1); saveData(); showSnackbar("✅ Habillement supprimé"); showEditUniformList(); }
    }
}

function showUniformReport() {
    if (!uniforms.length) {
        openPopup("👔 Rapport Habillement", "<p>Aucun habillement</p>", `<button class="popup-button green" onclick="showAddUniformForm()">➕ Ajouter</button><button class="popup-button gray" onclick="displayUniformMenu()">Retour</button>`);
        return;
    }
    const needsRenewalCount = uniforms.filter(u=>{
        return ['chemise','pantalon','tricot','ceinture','chaussures','cravate','veste','parka'].some(i=>u[i] && u[i].fourni && u[i].needsRenewal);
    }).length;
    const html = `<div class="info-section"><h3>👔 Rapport Habillement</h3><div>Agents équipés: ${uniforms.length}</div><div>À renouveler: ${needsRenewalCount}</div></div>`;
    openPopup("👔 Rapport Habillement", html, `<button class="popup-button green" onclick="showAddUniformForm()">➕ Ajouter</button><button class="popup-button blue" onclick="showUniformStats()">📊 Stats</button><button class="popup-button gray" onclick="displayUniformMenu()">Retour</button>`);
}

function showUniformStats() {
    if (!uniforms.length) { showSnackbar("ℹ️ Aucune donnée"); return; }
    const items = ['chemise','pantalon','tricot','ceinture','chaussures','cravate','veste','parka'];
    const stats = {};
    items.forEach(i=>stats[i]={});
    uniforms.forEach(u=>{
        items.forEach(i=>{
            const val = u[i];
            if (val && val.fourni) {
                const size = val.size;
                stats[i][size] = (stats[i][size]||0)+1;
            }
        });
    });
    const html = `<div class="info-section"><h3>📊 Statistiques Tailles</h3>${items.map(i=>`<div><strong>${i.charAt(0).toUpperCase()+i.slice(1)}s:</strong> ${Object.entries(stats[i]).map(([s,c])=>`${s}:${c}`).join(', ') || 'Aucune fournie'}</div>`).join('')}</div>`;
    openPopup("📊 Statistiques Tailles", html, `<button class="popup-button gray" onclick="showUniformReport()">Retour</button>`);
}

function showUniformDeadlines() {
    if (!uniforms.length) { showSnackbar("ℹ️ Aucune donnée"); return; }
    const today = new Date();
    const items = ['chemise','pantalon','tricot','ceinture','chaussures','cravate','veste','parka'];
    const deadlines = uniforms.filter(u=>{
        return items.some(i=>{
            const val = u[i];
            if (!val || !val.fourni) return false;
            const renewal = new Date(val.date);
            renewal.setFullYear(renewal.getFullYear()+2);
            return (renewal - today) <= 90*24*60*60*1000;
        });
    });
    if (!deadlines.length) { showSnackbar("✅ Aucune échéance dans 90 jours"); return; }
    const html = `<div class="info-section"><h3>📅 Échéances (90 jours)</h3>${deadlines.map(u=>{
        const agentName = u.agentName;
        const lines = [];
        items.forEach(i=>{
            const val = u[i];
            if (val && val.fourni) {
                const renewal = new Date(val.date);
                renewal.setFullYear(renewal.getFullYear()+2);
                const days = Math.ceil((renewal - today)/(1000*60*60*24));
                if (days <= 90) lines.push(`${i}: ${val.size} - ${days>0?days+' jours':'DÉPASSÉ'}`);
            }
        });
        return `<div><strong>${agentName}</strong><br>${lines.join('<br>')}</div>`;
    }).join('')}</div>`;
    openPopup("📅 Échéances Habillement", html, `<button class="popup-button gray" onclick="showUniformReport()">Retour</button>`);
}

function exportUniformReport() {
    if (!uniforms.length) { showSnackbar("ℹ️ Aucune donnée"); return; }
    const items = ['chemise','pantalon','tricot','ceinture','chaussures','cravate','veste','parka'];
    let csv = "Rapport Habillement\n\nAgent;Code;Groupe;"+items.map(i=>i.charAt(0).toUpperCase()+i.slice(1)+" Fourni;"+i.charAt(0).toUpperCase()+i.slice(1)+" Taille;"+i.charAt(0).toUpperCase()+i.slice(1)+" Date").join(';')+";Commentaires\n";
    uniforms.forEach(u=>{
        csv += `${u.agentName};${u.agentCode};${u.agentGroup};`+items.map(i=>{
            const val = u[i];
            if (!val || !val.fourni) return `Non;;`;
            return `Oui;${val.size};${val.date}`;
        }).join(';')+`;"${u.comments||''}"\n`;
    });
    downloadCSV(csv, `Habillement_${new Date().toISOString().split('T')[0]}.csv`);
    showSnackbar("✅ Export terminé");
}

// ==================== PARTIE 10 : AVERTISSEMENTS ====================

function displayWarningsMenu() {
    displaySubMenu("AVERTISSEMENTS DISCIPLINAIRES", [
        { text: "⚠️ Ajouter Avertissement", handler: showAddWarningForm },
        { text: "📋 Liste Avertissements", handler: showWarningsList },
        { text: "👤 Avertissements par Agent", handler: showAgentWarningsSelection },
        { text: "📊 Statistiques", handler: showWarningsStats },
        { text: "📤 Exporter Rapport", handler: exportWarningsReport },
        { text: "↩️ Retour Menu Principal", handler: displayMainMenu, className: "back-button" }
    ]);
}

function showAddWarningForm() {
    const html = `
        <div class="info-section">
            <h3>⚠️ Ajouter Avertissement</h3>
            <form id="addWarningForm" onsubmit="return saveWarning(event)">
                <div class="form-group"><label>Agent</label><select id="warningAgent">${agents.filter(a=>a.statut==='actif').map(a=>`<option value="${a.code}">${a.nom} ${a.prenom}</option>`).join('')}</select></div>
                <div class="form-group"><label>Type</label><select id="warningType"><option value="ORAL">Oral</option><option value="ECRIT">Écrit</option><option value="MISE_A_PIED">Mise à pied</option></select></div>
                <div class="form-group"><label>Date</label><input type="date" id="warningDate" value="${new Date().toISOString().split('T')[0]}" required></div>
                <div class="form-group"><label>Description</label><textarea id="warningDescription" rows="4" required></textarea></div>
                <div class="form-group"><label>Date fin (optionnelle)</label><input type="date" id="warningEndDate"></div>
            </form>
        </div>
    `;
    openPopup("⚠️ Ajouter Avertissement", html, `
        <button class="popup-button green" onclick="document.getElementById('addWarningForm').submit()">⚖️ Enregistrer</button>
        <button class="popup-button gray" onclick="showWarningsList()">Annuler</button>
    `);
}

function saveWarning(event) {
    event.preventDefault();
    const agentCode = document.getElementById('warningAgent').value;
    const type = document.getElementById('warningType').value;
    const date = document.getElementById('warningDate').value;
    const description = document.getElementById('warningDescription').value;
    const endDate = document.getElementById('warningEndDate').value;
    if (!agentCode || !type || !date || !description) { showSnackbar("⚠️ Champs obligatoires"); return false; }
    warnings.push({ id: 'WARN'+Date.now(), agent_code: agentCode, type, date, description, end_date: endDate||null, status: 'active', created_at: new Date().toISOString() });
    saveData();
    showSnackbar(`✅ Avertissement enregistré pour ${agentCode}`);
    showWarningsList();
    closePopup();
    return false;
}

function showWarningsList() {
    if (!warnings.length) {
        openPopup("⚠️ Avertissements", "<p>Aucun avertissement</p>", `<button class="popup-button green" onclick="showAddWarningForm()">➕ Ajouter</button><button class="popup-button gray" onclick="displayWarningsMenu()">Retour</button>`);
        return;
    }
    const html = `<div class="info-section"><h3>📋 Liste Avertissements</h3><table class="classement-table"><thead><tr><th>Agent</th><th>Type</th><th>Date</th><th>Description</th><th>Statut</th><th>Actions</th> </thead><tbody>${warnings.sort((a,b)=>new Date(b.date)-new Date(a.date)).map(w=>{
        const agent = agents.find(a=>a.code===w.agent_code);
        const typeColor = w.type==='ORAL'?'#f39c12':w.type==='ECRIT'?'#e74c3c':'#c0392b';
        return `<tr<td>${agent?agent.nom+' '+agent.prenom:w.agent_code}<br><small>${w.agent_code}</small></td<td><span style="background:${typeColor};color:white;padding:2px 8px;border-radius:12px;">${w.type}</span></td<td>${new Date(w.date).toLocaleDateString()}</td<td>${w.description.substring(0,40)}${w.description.length>40?'...':''}</td<td>${w.status==='active'?'Actif':'Archivé'}</td<td><button class="action-btn small blue" onclick="showWarningDetails('${w.id}')">👁️</button><button class="action-btn small orange" onclick="toggleWarningStatus('${w.id}')">${w.status==='active'?'📁':'📂'}</button></td></tr>`;
    }).join('')}</tbody>}</div>`;
    openPopup("⚠️ Avertissements", html, `<button class="popup-button green" onclick="showAddWarningForm()">➕ Ajouter</button><button class="popup-button gray" onclick="displayWarningsMenu()">Retour</button>`);
}

function showWarningDetails(warningId) {
    const w = warnings.find(w=>w.id===warningId);
    if (!w) return;
    const agent = agents.find(a=>a.code===w.agent_code);
    const html = `<div class="info-section"><h3>Détails Avertissement</h3><div>Agent: ${agent?agent.nom+' '+agent.prenom:w.agent_code}</div><div>Type: ${w.type}</div><div>Date: ${new Date(w.date).toLocaleDateString()}</div><div>Statut: ${w.status==='active'?'Actif':'Archivé'}</div>${w.end_date?`<div>Fin validité: ${new Date(w.end_date).toLocaleDateString()}</div>`:''}<div>Description: ${w.description}</div></div>`;
    openPopup("📋 Détails Avertissement", html, `<button class="popup-button orange" onclick="toggleWarningStatus('${w.id}')">${w.status==='active'?'📁 Archiver':'📂 Réactiver'}</button><button class="popup-button gray" onclick="showWarningsList()">Retour</button>`);
}

function toggleWarningStatus(warningId) {
    const idx = warnings.findIndex(w=>w.id===warningId);
    if (idx!==-1) {
        warnings[idx].status = warnings[idx].status==='active'?'archived':'active';
        warnings[idx].updated_at = new Date().toISOString();
        saveData();
        showSnackbar(`✅ Avertissement ${warnings[idx].status==='active'?'réactivé':'archivé'}`);
        showWarningsList();
    }
}

function showAgentWarningsSelection() {
    const html = `<div class="info-section"><h3>👤 Avertissements par Agent</h3><select id="warningsAgentSelect"><option value="">Tous</option>${agents.filter(a=>a.statut==='actif').map(a=>`<option value="${a.code}">${a.nom} ${a.prenom}</option>`).join('')}</select></div>`;
    openPopup("👤 Avertissements par Agent", html, `
        <button class="popup-button green" onclick="showSelectedAgentWarnings()">📋 Voir</button>
        <button class="popup-button gray" onclick="displayWarningsMenu()">Annuler</button>
    `);
}

function showSelectedAgentWarnings() {
    const agentCode = document.getElementById('warningsAgentSelect').value;
    let filtered = warnings;
    if (agentCode) filtered = filtered.filter(w=>w.agent_code===agentCode);
    if (!filtered.length) { showSnackbar("ℹ️ Aucun avertissement"); return; }
    const html = `<div class="info-section"><h3>Avertissements ${agentCode?`de ${agentCode}`:'tous'}</h3><table class="classement-table"><thead><tr><th>Date</th><th>Type</th>${!agentCode?'<th>Agent</th>':''}<th>Description</th><th>Statut</th> </thead><tbody>${filtered.sort((a,b)=>new Date(b.date)-new Date(a.date)).map(w=>{
        const agent = agents.find(a=>a.code===w.agent_code);
        return `<tr<td>${new Date(w.date).toLocaleDateString()}</td<td>${w.type}</td${!agentCode?`<td>${agent?agent.nom+' '+agent.prenom:w.agent_code}</td`:''}<td>${w.description.substring(0,50)}${w.description.length>50?'...':''}</td<td>${w.status==='active'?'Actif':'Archivé'}</td></tr>`;
    }).join('')}</tbody>}</div>`;
    openPopup("📋 Avertissements", html, `<button class="popup-button gray" onclick="showAgentWarningsSelection()">Retour</button>`);
}

function showWarningsStats() {
    if (!warnings.length) { showSnackbar("ℹ️ Aucune donnée"); return; }
    const byType = { ORAL:0, ECRIT:0, MISE_A_PIED:0 };
    const byStatus = { active:0, archived:0 };
    warnings.forEach(w=>{ byType[w.type]++; byStatus[w.status]++; });
    const html = `<div class="info-section"><h3>📊 Statistiques Avertissements</h3><div>Orals: ${byType.ORAL}</div><div>Écrits: ${byType.ECRIT}</div><div>Mises à pied: ${byType.MISE_A_PIED}</div><div>Actifs: ${byStatus.active}</div><div>Archivés: ${byStatus.archived}</div><div>Total: ${warnings.length}</div></div>`;
    openPopup("📊 Statistiques Avertissements", html, `<button class="popup-button gray" onclick="showWarningsList()">Retour</button>`);
}

function exportWarningsReport() {
    if (!warnings.length) { showSnackbar("ℹ️ Aucune donnée"); return; }
    let csv = "Rapport Avertissements\n\nAgent;Code;Type;Date;Description;Statut\n";
    warnings.forEach(w=>{
        const agent = agents.find(a=>a.code===w.agent_code);
        csv += `${agent?agent.nom+' '+agent.prenom:''};${w.agent_code};${w.type};${w.date};"${w.description}";${w.status}\n`;
    });
    downloadCSV(csv, `Avertissements_${new Date().toISOString().split('T')[0]}.csv`);
    showSnackbar("✅ Export terminé");
}

// ==================== PARTIE 11 : JOURS FÉRIÉS ====================

function displayHolidaysMenu() {
    displaySubMenu("GESTION JOURS FÉRIÉS", [
        { text: "➕ Ajouter Jour Férié", handler: showAddHolidayForm },
        { text: "🗑️ Supprimer Jour Férié", handler: showDeleteHolidayList },
        { text: "📋 Liste Jours Fériés", handler: showHolidaysList },
        { text: "🔄 Générer Annuelle", handler: generateYearlyHolidays },
        { text: "📅 Voir par Année", handler: showHolidaysByYear },
        { text: "↩️ Retour Menu Principal", handler: displayMainMenu, className: "back-button" }
    ]);
}

function showAddHolidayForm() {
    const html = `<div class="info-section"><h3>🎉 Ajouter Jour Férié</h3><div class="form-group"><label>Date</label><input type="date" id="holidayDate" required></div><div class="form-group"><label>Description</label><input type="text" id="holidayDescription" required></div><div class="form-group"><label>Type</label><select id="holidayType"><option value="fixe">Fixe</option><option value="national">Nationale</option><option value="religieux">Religieuse</option></select></div></div>`;
    openPopup("🎉 Ajouter Jour Férié", html, `
        <button class="popup-button green" onclick="saveHoliday()">💾 Enregistrer</button>
        <button class="popup-button gray" onclick="displayHolidaysMenu()">Annuler</button>
    `);
}

function saveHoliday() {
    const date = document.getElementById('holidayDate').value;
    const description = document.getElementById('holidayDescription').value;
    const type = document.getElementById('holidayType').value;
    if (!date || !description) { showSnackbar("⚠️ Champs obligatoires"); return; }
    if (holidays.find(h=>h.date===date)) { showSnackbar("⚠️ Jour déjà existant"); return; }
    const monthDay = date.substring(5);
    holidays.push({ date: monthDay, description, type, isRecurring: true, created_at: new Date().toISOString() });
    saveData();
    showSnackbar(`✅ Jour férié ajouté pour ${date}`);
    closePopup();
}

function showDeleteHolidayList() {
    if (!holidays.length) { showSnackbar("ℹ️ Aucun jour férié"); return; }
    const html = `<div class="info-section"><h3>🗑️ Supprimer Jour Férié</h3><table class="classement-table"><thead><tr><th>Date</th><th>Description</th><th>Type</th><th>Action</th> </thead><tbody>${holidays.map(h=>{
        const fullDate = `${new Date().getFullYear()}-${h.date}`;
        return `<tr<td>${fullDate}</td<td>${h.description}</td<td>${h.type}</td<td><button class="action-btn small red" onclick="deleteHoliday('${h.date}')">🗑️</button></td></tr>`;
    }).join('')}</tbody>}</div>`;
    openPopup("🗑️ Supprimer Jour Férié", html, `<button class="popup-button gray" onclick="displayHolidaysMenu()">Retour</button>`);
}

function deleteHoliday(dateStr) {
    if (confirm(`Supprimer le jour férié du ${dateStr} ?`)) {
        const idx = holidays.findIndex(h=>h.date===dateStr);
        if (idx!==-1) { holidays.splice(idx,1); saveData(); showSnackbar("✅ Supprimé"); showDeleteHolidayList(); }
    }
}

function showHolidaysList() {
    if (!holidays.length) {
        openPopup("📋 Jours Fériés", "<p>Aucun jour férié</p>", `<button class="popup-button green" onclick="showAddHolidayForm()">➕ Ajouter</button><button class="popup-button gray" onclick="displayHolidaysMenu()">Retour</button>`);
        return;
    }
    const year = new Date().getFullYear();
    const html = `<div class="info-section"><h3>📋 Jours Fériés</h3><table class="classement-table"><thead><tr><th>Date</th><th>Description</th><th>Type</th><th>Actions</th> </thead><tbody>${holidays.map(h=>{
        const fullDate = `${year}-${h.date}`;
        return `<tr<td>${fullDate}</td<td>${h.description}</td<td>${h.type}</td<td><button class="action-btn small blue" onclick="editHoliday('${h.date}')">✏️</button><button class="action-btn small red" onclick="deleteHoliday('${h.date}')">🗑️</button></td></tr>`;
    }).join('')}</tbody>}</div>`;
    openPopup("📋 Jours Fériés", html, `<button class="popup-button green" onclick="showAddHolidayForm()">➕ Ajouter</button><button class="popup-button gray" onclick="displayHolidaysMenu()">Retour</button>`);
}

function editHoliday(dateStr) {
    const h = holidays.find(h=>h.date===dateStr);
    if (!h) return;
    showAddHolidayForm();
    setTimeout(()=>{
        const fullDate = `${new Date().getFullYear()}-${h.date}`;
        document.getElementById('holidayDate').value = fullDate;
        document.getElementById('holidayDescription').value = h.description;
        document.getElementById('holidayType').value = h.type;
    },100);
}

function generateYearlyHolidays() {
    if (confirm("Réinitialiser les jours fériés aux dates fixes ?")) {
        initializeHolidays();
        saveData();
        showSnackbar("✅ Jours fériés réinitialisés");
        showHolidaysList();
    }
}

function showHolidaysByYear() {
    const year = new Date().getFullYear();
    const html = `<div class="info-section"><h3>📅 Jours Fériés par Année</h3><div class="form-group"><label>Année</label><input type="number" id="holidaysYear" value="${year}"></div><div id="holidaysYearDisplay"></div></div>`;
    openPopup("📅 Jours Fériés par Année", html, `
        <button class="popup-button green" onclick="showHolidaysForYear()">📅 Afficher</button>
        <button class="popup-button gray" onclick="displayHolidaysMenu()">Retour</button>
    `);
}

function showHolidaysForYear() {
    const year = parseInt(document.getElementById('holidaysYear').value);
    const filtered = holidays.filter(h=>true);
    if (!filtered.length) { document.getElementById('holidaysYearDisplay').innerHTML = '<p>Aucun</p>'; return; }
    const html = `<table class="classement-table"><thead><tr><th>Date</th><th>Jour</th><th>Description</th><th>Type</th> </thead><tbody>${filtered.map(h=>{
        const fullDate = new Date(`${year}-${h.date}`);
        const dayName = JOURS_FRANCAIS[fullDate.getDay()];
        return `<tr<td>${year}-${h.date}</td<td>${dayName}</td<td>${h.description}</td<td>${h.type}</td></tr>`;
    }).join('')}</tbody></table>`;
    document.getElementById('holidaysYearDisplay').innerHTML = html;
}
// ==================== PARTIE 7 : EXPORTATIONS (avec PDF), CONFIGURATION ET JOKERS ====================

function displayExportMenu() {
    displaySubMenu("EXPORTATIONS", [
        { text: "📊 Statistiques Excel", handler: exportStatsExcel },
        { text: "📅 Planning Excel", handler: exportPlanningExcel },
        { text: "📄 Export Planning PDF", handler: showExportPDFDialog },
        { text: "👥 Agents CSV", handler: exportAgentsCSV },
        { text: "📋 Congés PDF", handler: exportLeavesPDF },
        { text: "📊 Rapport Complet", handler: exportFullReport },
        { text: "💾 Sauvegarde Complète", handler: backupAllData },
        { text: "↩️ Retour Menu Principal", handler: displayMainMenu, className: "back-button" }
    ]);
}

function showExportPDFDialog() {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    const groups = [...new Set(agents.filter(a => a.statut === 'actif').map(a => a.groupe))].sort();
    const html = `
        <div class="info-section">
            <h3>📄 Export Planning PDF</h3>
            <div class="form-group"><label>Type de planning</label><select id="exportPDFType">
                <option value="global">Planning global</option>
                <option value="groupe">Planning par groupe</option>
                <option value="agent">Planning par agent</option>
            </select></div>
            <div class="form-group"><label>Mois</label><select id="exportPDFMonth">
                ${Array.from({length:12}, (_,i) => `<option value="${i+1}" ${i+1===currentMonth ? 'selected' : ''}>${MOIS_FRANCAIS[i]}</option>`).join('')}
            </select></div>
            <div class="form-group"><label>Année</label><input type="number" id="exportPDFYear" value="${currentYear}" min="2020" max="2030"></div>
            <div id="pdfGroupDiv" style="display:none;"><div class="form-group"><label>Groupe</label><select id="exportPDFGroup"><option value="">Sélectionner</option>${groups.map(g=>`<option value="${g}">Groupe ${g}</option>`).join('')}</select></div></div>
            <div id="pdfAgentDiv" style="display:none;"><div class="form-group"><label>Agent</label><select id="exportPDFAgent">${agents.filter(a=>a.statut==='actif').map(a=>`<option value="${a.code}">${a.nom} ${a.prenom}</option>`).join('')}</select></div></div>
        </div>
    `;
    openPopup("📄 Export Planning PDF", html, `
        <button class="popup-button green" onclick="exportPlanningPDF()">📥 Générer PDF</button>
        <button class="popup-button gray" onclick="closePopup()">Annuler</button>
    `);
    const typeSelect = document.getElementById('exportPDFType');
    const groupDiv = document.getElementById('pdfGroupDiv');
    const agentDiv = document.getElementById('pdfAgentDiv');
    typeSelect.addEventListener('change', () => {
        groupDiv.style.display = typeSelect.value === 'groupe' ? 'block' : 'none';
        agentDiv.style.display = typeSelect.value === 'agent' ? 'block' : 'none';
    });
}

function exportPlanningPDF() {
    const type = document.getElementById('exportPDFType')?.value || 'global';
    const month = parseInt(document.getElementById('exportPDFMonth')?.value || new Date().getMonth() + 1);
    const year = parseInt(document.getElementById('exportPDFYear')?.value || new Date().getFullYear());
    let param = null;
    if (type === 'groupe') {
        param = document.getElementById('exportPDFGroup')?.value;
        if (!param) { showSnackbar("⚠️ Sélectionnez un groupe"); return; }
    } else if (type === 'agent') {
        param = document.getElementById('exportPDFAgent')?.value;
        if (!param) { showSnackbar("⚠️ Sélectionnez un agent"); return; }
    }

    let agentsList = [];
    let title = "";
    if (type === 'global') {
        agentsList = agents.filter(a => a.statut === 'actif');
        title = `Planning_Global_${getMonthName(month)}_${year}`;
    } else if (type === 'groupe') {
        agentsList = agents.filter(a => a.groupe === param && a.statut === 'actif');
        title = `Planning_Groupe_${param}_${getMonthName(month)}_${year}`;
    } else if (type === 'agent') {
        const agent = agents.find(a => a.code === param);
        if (!agent) { showSnackbar("⚠️ Agent non trouvé"); return; }
        agentsList = [agent];
        title = `Planning_${agent.code}_${getMonthName(month)}_${year}`;
    }
    if (agentsList.length === 0) { showSnackbar("⚠️ Aucune donnée à exporter"); return; }

    const daysInMonth = new Date(year, month, 0).getDate();
    const headers = ['Agent', 'Code', 'Groupe'];
    for (let d = 1; d <= daysInMonth; d++) headers.push(`${d}`);
    headers.push('Congés', 'Maladie', 'Autre', 'Travaillés', 'Fériés', 'Total');

    const rows = [];
    for (const agent of agentsList) {
        const stats = calculateAgentStats(agent.code, month, year);
        const getVal = (label) => stats.find(s => s.label === label)?.value || 0;
        const conges = getVal('Congés (C)');
        const maladie = getVal('Maladie (M)');
        const autre = getVal('Autre absence (A)');
        const travailles = getVal('Total travaillés');
        const feries = getVal('Jours fériés');
        const totalGeneral = getVal('Total général');
        
        let row = [agent.nom + ' ' + agent.prenom, agent.code, agent.groupe];
        for (let d = 1; d <= daysInMonth; d++) {
            const dateStr = `${year}-${month.toString().padStart(2,'0')}-${d.toString().padStart(2,'0')}`;
            const shift = getShiftForAgent(agent.code, dateStr);
            row.push(shift);
        }
        row.push(conges, maladie, autre, travailles, feries, totalGeneral);
        rows.push(row);
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ orientation: 'landscape', unit: 'mm' });
    doc.setFontSize(16);
    doc.text(title.replace(/_/g, ' '), 14, 15);
    doc.setFontSize(10);
    doc.text(`Généré le ${new Date().toLocaleDateString()}`, 14, 22);
    
    doc.autoTable({
        head: [headers],
        body: rows,
        startY: 30,
        theme: 'striped',
        styles: { fontSize: 8, cellPadding: 1, overflow: 'linebreak' },
        headStyles: { fillColor: [41, 128, 185], textColor: 255, fontSize: 8 },
        columnStyles: {
            0: { cellWidth: 25 },
            1: { cellWidth: 15 },
            2: { cellWidth: 12 },
        },
        margin: { top: 30, left: 10, right: 10 }
    });
    
    doc.save(`${title}.pdf`);
    showSnackbar("✅ PDF généré");
}

// Exporter les statistiques Excel (identique à avant)
function exportStatsExcel() {
    let csv = "Statistiques Générales\n\nCode;Nom;Prénom;Groupe;Matricule;CIN;Téléphone;Poste;Date entrée;Statut\n";
    agents.forEach(a=>csv+=`${a.code};${a.nom};${a.prenom};${a.groupe};${a.matricule||''};${a.cin||''};${a.tel||''};${a.poste||''};${a.date_entree||''};${a.statut}\n`);
    downloadCSV(csv, `Statistiques_Agents_${new Date().toISOString().split('T')[0]}.csv`);
    showSnackbar("✅ Export statistiques");
}

function exportPlanningExcel() {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    const groups = [...new Set(agents.filter(a => a.statut === 'actif').map(a => a.groupe))].sort();
    const html = `
        <div class="info-section">
            <h3>📅 Export du planning</h3>
            <div class="form-group"><label>Type de planning</label><select id="exportType"><option value="global">Planning global</option><option value="groupe">Planning par groupe</option><option value="agent">Planning par agent</option></select></div>
            <div class="form-group"><label>Mois</label><select id="exportMonth">${Array.from({length:12},(_,i)=>{const m=i+1;return`<option value="${m}" ${m===currentMonth?'selected':''}>${MOIS_FRANCAIS[i]}</option>`}).join('')}</select></div>
            <div class="form-group"><label>Année</label><input type="number" id="exportYear" value="${currentYear}" min="2020" max="2030"></div>
            <div id="groupSelectDiv" style="display:none;"><div class="form-group"><label>Groupe</label><select id="exportGroup"><option value="">Sélectionner</option>${groups.map(g=>`<option value="${g}">Groupe ${g}</option>`).join('')}</select></div></div>
            <div id="agentSelectDiv" style="display:none;"><div class="form-group"><label>Agent</label><select id="exportAgent">${agents.filter(a=>a.statut==='actif').map(a=>`<option value="${a.code}">${a.nom} ${a.prenom} (${a.code})</option>`).join('')}</select></div></div>
        </div>
    `;
    openPopup("📊 Export planning Excel", html, `<button class="popup-button green" onclick="executePlanningExport()">📥 Exporter</button><button class="popup-button gray" onclick="closePopup()">Annuler</button>`);
    setTimeout(()=>{
        const typeSelect = document.getElementById('exportType');
        const groupDiv = document.getElementById('groupSelectDiv');
        const agentDiv = document.getElementById('agentSelectDiv');
        typeSelect.addEventListener('change',()=>{groupDiv.style.display=typeSelect.value==='groupe'?'block':'none';agentDiv.style.display=typeSelect.value==='agent'?'block':'none';});
    },100);
}

function executePlanningExport() {
    const type = document.getElementById('exportType').value;
    const month = parseInt(document.getElementById('exportMonth').value);
    const year = parseInt(document.getElementById('exportYear').value);
    if (type === 'groupe') {
        const group = document.getElementById('exportGroup').value;
        if (!group) { showSnackbar("⚠️ Veuillez sélectionner un groupe"); return; }
        exportPlanningToExcel('groupe', month, year, group);
    } else if (type === 'agent') {
        const agentCode = document.getElementById('exportAgent').value;
        if (!agentCode) { showSnackbar("⚠️ Veuillez sélectionner un agent"); return; }
        exportPlanningToExcel('agent', month, year, agentCode);
    } else {
        exportPlanningToExcel('global', month, year);
    }
    closePopup();
}

function exportPlanningToExcel(type, month, year, param = null) {
    let agentsList = [];
    let title = "";
    if (type === 'global') { agentsList = agents.filter(a=>a.statut==='actif'); title = `Planning_Global_${getMonthName(month)}_${year}`; }
    else if (type === 'groupe') { agentsList = agents.filter(a=>a.groupe===param && a.statut==='actif'); title = `Planning_Groupe_${param}_${getMonthName(month)}_${year}`; }
    else if (type === 'agent') { const agent = agents.find(a=>a.code===param); if(!agent) return; agentsList = [agent]; title = `Planning_${agent.code}_${getMonthName(month)}_${year}`; }
    if (agentsList.length === 0) { showSnackbar("⚠️ Aucun agent à exporter"); return; }
    const daysInMonth = new Date(year, month, 0).getDate();
    let headers = ['Agent', 'Code', 'Groupe'];
    for (let d=1; d<=daysInMonth; d++) headers.push(`${d}`);
    headers.push('Congés', 'Maladie', 'Autre abs.', 'Travaillés', 'Jours fériés', 'Total général');
    let rows = [];
    for (const agent of agentsList) {
        const stats = calculateAgentStats(agent.code, month, year);
        const getVal = (label) => stats.find(s=>s.label===label)?.value||0;
        const conges = getVal('Congés (C)');
        const maladie = getVal('Maladie (M)');
        const autre = getVal('Autre absence (A)');
        const travailles = getVal('Total travaillés');
        const feries = getVal('Jours fériés');
        const totalGeneral = getVal('Total général');
        let row = [agent.nom+' '+agent.prenom, agent.code, agent.groupe];
        for(let d=1; d<=daysInMonth; d++){
            const dateStr = `${year}-${month.toString().padStart(2,'0')}-${d.toString().padStart(2,'0')}`;
            const shift = getShiftForAgent(agent.code, dateStr);
            row.push(shift);
        }
        row.push(conges, maladie, autre, travailles, feries, totalGeneral);
        rows.push(row);
    }
    let csvContent = headers.join(';')+'\n';
    for(const row of rows) csvContent += row.join(';')+'\n';
    const blob = new Blob(["\uFEFF"+csvContent], {type:'text/csv;charset=utf-8;'});
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${title}.csv`;
    link.click();
    URL.revokeObjectURL(link.href);
    showSnackbar(`✅ Export terminé : ${title}.csv`);
}

function exportLeavesPDF() {
    let csv = "Rapport Congés\n\nAgent;Code;Date(s);Type;Commentaire\n";
    Object.keys(planningData).forEach(monthKey=>{
        Object.keys(planningData[monthKey]).forEach(agentCode=>{
            Object.keys(planningData[monthKey][agentCode]).forEach(dateStr=>{
                const rec = planningData[monthKey][agentCode][dateStr];
                if (['C','M','A'].includes(rec.shift)) {
                    const agent = agents.find(a=>a.code===agentCode);
                    csv += `${agent?agent.nom+' '+agent.prenom:''};${agentCode};${dateStr};${SHIFT_LABELS[rec.shift]};"${rec.comment||''}"\n`;
                }
            });
        });
    });
    if (leaves) leaves.forEach(l=>{
        const agent = agents.find(a=>a.code===l.agent_code);
        csv += `${agent?agent.nom+' '+agent.prenom:''};${l.agent_code};${l.start_date} au ${l.end_date};Période;"${l.comment||''}"\n`;
    });
    downloadCSV(csv, `Conges_${new Date().toISOString().split('T')[0]}.csv`);
    showSnackbar("✅ Export congés");
}

function exportFullReport() {
    let csv = "Rapport Complet\n\n";
    csv += "=== AGENTS ===\nCode;Nom;Prénom;Groupe;Statut;Poste;Téléphone\n";
    agents.forEach(a=>csv+=`${a.code};${a.nom};${a.prenom};${a.groupe};${a.statut};${a.poste||''};${a.tel||''}\n`);
    csv += "\n=== RADIOS ===\nID;Modèle;Statut;Prix\n";
    radios.forEach(r=>csv+=`${r.id};${r.model};${r.status};${r.price||''}\n`);
    csv += "\n=== AVERTISSEMENTS ===\nAgent;Type;Date;Description;Statut\n";
    warnings.forEach(w=>csv+=`${w.agent_code};${w.type};${w.date};"${w.description}";${w.status}\n`);
    downloadCSV(csv, `Rapport_Complet_${new Date().toISOString().split('T')[0]}.csv`);
    showSnackbar("✅ Rapport complet exporté");
}

function backupAllData() {
    const data = { agents, planningData, holidays, panicCodes, radios, uniforms, warnings, leaves, radioHistory, auditLog, exportDate: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(data,null,2)], {type:'application/json'});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `sga_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
    showSnackbar("✅ Sauvegarde effectuée");
}

// ==================== CONFIGURATION ====================

function displayConfigMenu() {
    displaySubMenu("CONFIGURATION", [
        { text: "⚙️ Paramètres", handler: showSettings },
        { text: "🗃️ Gestion Base de Données", handler: showDatabaseManagement },
        { text: "💾 Sauvegarde", handler: showBackupOptions },
        { text: "📤 Restauration", handler: showRestoreOptions },
        { text: "🗑️ Effacer Données", handler: showClearDataConfirm },
        { text: "🔄 Réinitialiser", handler: showResetConfirm },
        { text: "📁 Importer data.js", handler: showImportDataJs },
        { text: "🤖 Configuration Jokers", handler: showJokerConfig, className: "menu-section" },
        { text: "ℹ️ A propos", handler: showAbout },
        { text: "💾 Sauvegarder maintenant", handler: confirmSaveData, className: "menu-button" },
        { text: "↩️ Retour Menu Principal", handler: displayMainMenu, className: "back-button" }
    ]);
}

function showSettings() {
    const html = `<div class="info-section"><h3>⚙️ Paramètres</h3><div class="form-group"><label>Mot de passe admin</label><input type="password" id="adminPassword"><button class="action-btn small blue" onclick="changeAdminPassword()">Changer</button></div><div class="form-group"><label>Thème</label><select id="themeSelect" onchange="changeTheme()"><option value="dark">Sombre</option><option value="light">Clair</option></select></div><div class="form-group"><label>Langue</label><select id="langSelect" onchange="changeLanguage()"><option value="fr">Français</option><option value="ar">العربية</option></select></div></div>`;
    openPopup("⚙️ Paramètres", html, `<button class="popup-button gray" onclick="displayConfigMenu()">Retour</button>`);
}

function changeAdminPassword() {
    const pwd = document.getElementById('adminPassword').value;
    if (!pwd) { showSnackbar("⚠️ Entrez un mot de passe"); return; }
    localStorage.setItem('admin_password', pwd);
    showSnackbar("✅ Mot de passe modifié");
}

function changeTheme() {
    const theme = document.getElementById('themeSelect').value;
    if (theme==='light') { document.body.style.backgroundColor='#ecf0f1'; document.body.style.color='#2c3e50'; }
    else { document.body.style.backgroundColor='#2c3e50'; document.body.style.color='#ecf0f1'; }
    localStorage.setItem('theme',theme);
}

function changeLanguage() {
    const lang = document.getElementById('langSelect').value;
    localStorage.setItem('lang',lang);
    showSnackbar("🌐 Langue modifiée");
}

function showDatabaseManagement() {
    const html = `<div class="info-section"><h3>🗃️ Gestion Base de Données</h3><div><button class="popup-button blue" onclick="exportAllData()">📤 Exporter toutes les données</button></div><div><button class="popup-button orange" onclick="importAllData()">📥 Importer des données</button></div><div><button class="popup-button red" onclick="clearAllData()">🗑️ Effacer toutes les données</button></div><div>Agents: ${agents.length}</div><div>Radios: ${radios.length}</div><div>Habillement: ${uniforms.length}</div><div>Avertissements: ${warnings.length}</div></div>`;
    openPopup("🗃️ Gestion Base de Données", html, `<button class="popup-button gray" onclick="displayConfigMenu()">Retour</button>`);
}

function exportAllData() {
    const all = { agents, planningData, holidays, panicCodes, radios, uniforms, warnings, leaves, radioHistory, auditLog, exportDate: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(all,null,2)], {type:'application/json'});
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `sga_backup_${new Date().toISOString().split('T')[0]}.json`; a.click(); URL.revokeObjectURL(a.href);
    showSnackbar("✅ Données exportées");
}

function importAllData() {
    const input = document.createElement('input'); input.type='file'; input.accept='.json';
    input.onchange = e=>{
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = ev=>{
            try {
                const data = JSON.parse(ev.target.result);
                if (confirm("⚠️ Remplacer toutes les données ?")) {
                    if (data.agents) { agents.length=0; agents.push(...data.agents); }
                    if (data.planningData) Object.assign(planningData, data.planningData);
                    if (data.holidays) { holidays.length=0; holidays.push(...data.holidays); }
                    if (data.radios) { radios.length=0; radios.push(...data.radios); }
                    if (data.uniforms) { uniforms.length=0; uniforms.push(...data.uniforms); }
                    if (data.warnings) { warnings.length=0; warnings.push(...data.warnings); }
                    if (data.leaves) { leaves.length=0; leaves.push(...data.leaves); }
                    saveData();
                    showSnackbar("✅ Données importées");
                    location.reload();
                }
            } catch { showSnackbar("❌ Erreur import"); }
        };
        reader.readAsText(file);
    };
    input.click();
}

function showBackupOptions() { showDatabaseManagement(); }
function showRestoreOptions() { importAllData(); }
function showClearDataConfirm() {
    if (confirm("⚠️ Effacer TOUTES les données ?") && confirm("DERNIER AVERTISSEMENT")) {
        localStorage.clear();
        showSnackbar("✅ Données effacées");
        setTimeout(()=>location.reload(),1500);
    }
}
function showResetConfirm() {
    if (confirm("🔄 Réinitialiser ?")) {
        initializeTestData();
        saveData();
        showSnackbar("✅ Données réinitialisées");
        location.reload();
    }
}
function showAbout() {
    const html = `<div class="info-section"><h3>ℹ️ À propos</h3><p>SGA - Système de Gestion des Agents v1.0</p><p>© 2024 - CleanCo</p></div>`;
    openPopup("ℹ️ À propos", html, `<button class="popup-button gray" onclick="displayConfigMenu()">Fermer</button>`);
}
function showImportDataJs() {
    const html = `
        <div class="info-section">
            <h3>📁 Importer data.js</h3>
            <p>Sélectionnez un fichier data.js contenant la variable <strong>agents</strong>.</p>
            <div class="form-group"><label>Fichier</label><input type="file" id="dataJsFile" accept=".js"></div>
            <div class="form-group"><label>Options</label><div><label><input type="radio" name="importDataJsMode" value="replace" checked> Remplacer</label><label><input type="radio" name="importDataJsMode" value="merge"> Fusionner</label></div></div>
        </div>
    `;
    openPopup("📁 Importer data.js", html, `
        <button class="popup-button green" onclick="importDataJsFile()">📥 Importer</button>
        <button class="popup-button gray" onclick="displayConfigMenu()">Annuler</button>
    `);
}
function importDataJsFile() {
    const fileInput = document.getElementById('dataJsFile');
    if (!fileInput || !fileInput.files.length) { showSnackbar("⚠️ Sélectionnez un fichier"); return; }
    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.onload = e => {
        const content = e.target.result;
        let importedAgents = null;
        try {
            const func = new Function('return (function() { ' + content + '; return agents; })();');
            importedAgents = func();
            if (!importedAgents || !Array.isArray(importedAgents) || importedAgents.length === 0) {
                throw new Error('Aucun agent trouvé');
            }
        } catch (err) {
            console.warn(err);
            showSnackbar("❌ Erreur : fichier invalide ou variable 'agents' manquante");
            return;
        }
        const mode = document.querySelector('input[name="importDataJsMode"]:checked').value;
        if (mode === 'replace') {
            agents.length = 0;
            agents.push(...importedAgents);
            showSnackbar(`✅ ${importedAgents.length} agents importés (remplacement)`);
        } else {
            const existing = new Set(agents.map(a => a.code));
            let added = 0;
            importedAgents.forEach(a => {
                if (!existing.has(a.code)) {
                    agents.push(a);
                    added++;
                }
            });
            showSnackbar(`✅ ${added} nouveaux agents importés (fusion)`);
        }
        saveData();
        closePopup();
        displayAgentsList();
    };
    reader.onerror = () => showSnackbar("❌ Erreur de lecture du fichier");
    reader.readAsText(file, 'UTF-8');
}
function confirmSaveData() {
    if (confirm("Voulez-vous sauvegarder toutes les données ?")) {
        saveData();
        showSnackbar("✅ Données sauvegardées avec succès !");
    }
}
function checkExpiredWarnings() {
    const today = new Date();
    warnings.forEach(w=>{
        if (w.status==='active' && w.end_date && new Date(w.end_date) < today) {
            w.status = 'archived';
            w.auto_archived = true;
        }
    });
    saveData();
}

// ==================== CONFIGURATION DES JOKERS ====================

function showJokerConfig() {
    const html = `
        <div class="info-section">
            <h3>🤖 Configuration des Jokers</h3>
            <div class="form-group">
                <label>Nombre maximal de jokers actifs par jour</label>
                <input type="number" id="maxJokersPerDay" value="${jokerConfig.maxPerDay}" min="0" max="10" style="width:100%;">
                <small>0 = pas de remplacement automatique</small>
            </div>
            <div class="form-group">
                <label>Assignation manuelle</label>
                <select id="manualAssign" style="width:100%;">
                    <option value="true" ${jokerConfig.manualAssignment ? 'selected' : ''}>Oui (choisir à chaque absence)</option>
                    <option value="false" ${!jokerConfig.manualAssignment ? 'selected' : ''}>Non (automatique)</option>
                </select>
                <small>Si "Oui", une boîte de dialogue demandera quel joker utiliser lors de l'ajout d'une absence.</small>
            </div>
            <div style="margin-top:15px; background:#34495e; padding:10px; border-radius:5px;">
                <h4>État actuel des jokers</h4>
                <p>Jokers disponibles: ${agents.filter(a=>a.groupe==='J' && a.statut==='actif').map(j=>j.code).join(', ') || 'Aucun'}</p>
                <p>Limite journalière: ${jokerConfig.maxPerDay}</p>
                <p>Mode: ${jokerConfig.manualAssignment ? 'Manuel' : 'Automatique'}</p>
            </div>
        </div>
    `;
    openPopup("🤖 Configuration Jokers", html, `
        <button class="popup-button green" onclick="saveJokerConfig()">💾 Enregistrer</button>
        <button class="popup-button gray" onclick="displayConfigMenu()">Retour</button>
    `);
}

function saveJokerConfig() {
    const newMax = parseInt(document.getElementById('maxJokersPerDay').value);
    if (!isNaN(newMax) && newMax >= 0) jokerConfig.maxPerDay = newMax;
    jokerConfig.manualAssignment = document.getElementById('manualAssign').value === 'true';
    localStorage.setItem('sga_joker_config', JSON.stringify(jokerConfig));
    jokerAssignments = {};
    showSnackbar("✅ Configuration des jokers sauvegardée");
    closePopup();
}
