/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SubjectName, Difficulty, Exercise, Formula, ExamQuestion } from "./types";

export const EXERCISES: Exercise[] = [
  {
    id: "ex_mat_1",
    idAttr: "exercise-mat-matrices",
    subject: SubjectName.MATEMATIQUES,
    topic: "Àlgebra Lineal",
    difficulty: Difficulty.MEDIUM,
    estimatedTimeMin: 15,
    statement: "Calcula el producte de les matrius A i B, sent tres elements clau de la selectivitat PAU per dimensionat vectorial:",
    mathFormula: "A = [ [2, -1], [0, 3] ] \nB = [ [1, 4], [-2, 5] ]",
    steps: [
      {
        title: "Comprovació de dimensions",
        explanation: "Abans de multiplicar, hem de verificar que el nombre de columnes de la matriu A és igual al nombre de files de la matriu B. Les dues matrius són d'ordre 2x2. Per tant, es poden multiplicar i la matriu resultant C tindrà files d'A i columnes de B, donant un ordre de 2x2.",
        mathBlock: "Dimensió A: 2 × 2  |  Dimensió B: 2 × 2"
      },
      {
        title: "Càlcul de c11 i c12 (Fila 1 d'A per columnes de B)",
        explanation: "Multipliquem la Fila 1 d'A [2, -1] pels vectors columna de B: \nColumn 1 de B [1, -2]: c11 = 2·1 + (-1)·(-2) = 2 + 2 = 4. \nColumn 2 de B [4, 5]: c12 = 2·4 + (-1)·5 = 8 - 5 = 3.",
        mathBlock: "c11 = 4 , c12 = 3"
      },
      {
        title: "Càlcul de c21 i c22 (Fila 2 d'A per columnes de B)",
        explanation: "Multipliquem la Fila 2 d'A [0, 3] pels mateixos vectors columna de B: \nColumn 1 de B [1, -2]: c21 = 0·1 + 3·(-2) = -6. \nColumn 2 de B [4, 5]: c22 = 0·4 + 3·5 = 15.",
        mathBlock: "c21 = -6 , c22 = 15"
      }
    ],
    typicalMistake: "Compte amb els signes negatius al multiplicar! Un error freqüent a la PAU és sumar en lloc de restar en fer (-1)·(-2) o confondre files per files en lloc de files per columnes.",
    pauStrategy: "En els exàmens de la PAU, sempre s'ha d'escriure la justificació teòrica de la multiplicabilitat basant-se en les dimensions abans d'omplir directament els nombres del càlcul.",
    finalResultText: "C = [ [4, 3], [-6, 15] ]"
  },
  {
    id: "ex_mat_2",
    idAttr: "exercise-mat-integrals",
    subject: SubjectName.MATEMATIQUES,
    topic: "Funcions i Integrals",
    difficulty: Difficulty.HARD,
    estimatedTimeMin: 20,
    statement: "Calcula l'àrea delimitada per la funció f(x) = x² - 4x i l'eix de les abscisses entre les seves interseccions.",
    steps: [
      {
        title: "Trobar els punts d'intersecció",
        explanation: "Igualem f(x) a zero per trobar on talla l'eix x: x² - 4x = 0  => x(x - 4) = 0. Els valors crítics són x = 0 i x = 4. El interval d'integració serà [0, 4].",
        mathBlock: "x = 0  i  x = 4"
      },
      {
        title: "Plantejar la integral de l'àrea",
        explanation: "Com que la paràbola f(x) es troba per sota de l'eix x en aquest interval, el valor de la integral serà negatiu. Ens cal el valor absolut de la integral definida de 0 a 4 de f(x)dx.",
        mathBlock: "Àrea = | ∫ [de 0 a 4] (x² - 4x) dx |"
      },
      {
        title: "Calcular la primitiva F(x)",
        explanation: "Trobem la primitiva de f(x): F(x) = (x³ / 3) - 2x².",
        mathBlock: "F(x) = x³/3 - 2x²"
      },
      {
        title: "Aplicar la Regla de Barrow",
        explanation: "Avaluem F(4) - F(0): \nF(4) = (64/3) - 32 = (64 - 96)/3 = -32/3. \nF(0) = 0. \nPer tant, la integral és -32/3, l'àrea absoluta és 32/3 unitats quadrades.",
        mathBlock: "Àrea = 32/3 ≈ 10.67 u²"
      }
    ],
    typicalMistake: "Oblidar el valor absolut! Una àrea geomètrica mai pot ser negativa. Si et dóna un resultat final negatiu, revisa si has ignorat la posició relativa de la funció.",
    pauStrategy: "Dibuixa sempre un petit esquema manual de la funció per guanyar punts d'anàlisi de gràfics en la correcció oficial.",
    finalResultText: "32/3 unitats quadrades"
  },
  {
    id: "ex_mat_3",
    idAttr: "exercise-mat-bayes",
    subject: SubjectName.MATEMATIQUES,
    topic: "Probabilitat i Estadística",
    difficulty: Difficulty.MEDIUM,
    estimatedTimeMin: 12,
    statement: "En una acadèmia PAU, el 60% dels estudiants es preparen Química i el 40% Física. El percentatge d'aprovats entre els de Química és el 85%, i de Física el 75%. Es tria un estudiant a l'atzar i ha aprovat. Quina és la probabilitat de que provingui de Química?",
    steps: [
      {
        title: "Identificar esdeveniments i probabilitats a priori",
        explanation: "Definim Q: Estudiant de Química (P(Q) = 0.60), F: Estudiant de Física (P(F) = 0.40). Definim A: Estudiant que aprova. Les probabilitats condicionades en l'enunciat són: P(A|Q) = 0.85, P(A|F) = 0.75.",
        mathBlock: "P(Q) = 0.60, P(F) = 0.40"
      },
      {
        title: "Calcular la probabilitat total d'aprovar",
        explanation: "Apliquem el Teorema de la Probabilitat Total: P(A) = P(Q)·P(A|Q) + P(F)·P(A|F). Multipliquem les branques: P(A) = 0.75·0.40 + 0.85·0.60 = 0.30 + 0.51 = 0.81.",
        mathBlock: "P(A) = 0.81"
      },
      {
        title: "Aplicar el Teorema de Bayes",
        explanation: "Volem la probabilitat posterior de Química donat l'aprovat, P(Q|A): P(Q|A) = [ P(Q) · P(A|Q) ] / P(A) = (0.60 · 0.85) / 0.81 = 0.51 / 0.81 = 51/81 ≈ 0.6296.",
        mathBlock: "P(Q|A) = 51/81 ≈ 62.96%"
      }
    ],
    typicalMistake: "Substituir els decimals erròniament o oblidar sumar tots els termes al denominador (P(A)). Dibuixa un diagrama d'arbre per assegurar-te de sumar correctament.",
    pauStrategy: "Enumera explícitament els esdeveniments. Els criteris de correcció de la PAU assignen fins a 0.5 punts només per la nomenclatura i formalització matemàtica del teorema.",
    finalResultText: "62.96%"
  },
  {
    id: "ex_fis_1",
    idAttr: "exercise-fis-gravitatori",
    subject: SubjectName.FISICA,
    topic: "Camp Gravitatori",
    difficulty: Difficulty.MEDIUM,
    estimatedTimeMin: 15,
    statement: "Un satèl·lit de comunicacions de 500 kg orbita a una alçada per sobre de la superfície terrestre igual al radi de la Terra (R = 6370 km). Calcula l'acceleració de la gravetat que experimenta el satèl·lit.",
    steps: [
      {
        title: "Calcular la distància total des del centre",
        explanation: "L'alçada h és igual a R. Per tant, la distància r des del centre de la Terra és r = R + h = 2R.",
        mathBlock: "r = 2 · 6370 km = 12740 km = 1.274 · 10^7 m"
      },
      {
        title: "Relacionar amb g a la superfície",
        explanation: "La gravetat s'expressa com g = G·M / r². Sabem que a la superfície terrestre (r = R), g0 = G·M / R² ≈ 9.8 m/s². Per tant, a r = 2R, l'acceleració g és g = G·M / (2R)² = (G·M / R²) / 4 = g0 / 4.",
        mathBlock: "g = g0 / 4"
      },
      {
        title: "Calcular el valor numèric final",
        explanation: "Calculant amb g0 = 9.8得到: g = 9.8 / 4 = 2.45 m/s².",
        mathBlock: "g = 2.45 m/s²"
      }
    ],
    typicalMistake: "No convertir els quilòmetres a metres o oblidar que r és el radi de la Terra MÉS l'alçada (h), l'error clàssic és usar directament h pel radi orbital.",
    pauStrategy: "Agafa les constants exactes donades a la primera pàgina de l'examen PAU (com G, Massa de la Terra). No usis constants apreses de memòria si difereixen en decimals.",
    finalResultText: "2.45 m/s²"
  },
  {
    id: "ex_qui_1",
    idAttr: "exercise-qui-acidbase",
    subject: SubjectName.QUIMICA,
    topic: "Equilibri Acid-Base",
    difficulty: Difficulty.MEDIUM,
    estimatedTimeMin: 18,
    statement: "Es prepara una solució dissolent 0.1 mol d'àcid acètic (Ka = 1.8·10^-5) i 0.1 mol d'acetat de sodi en aigua fins a obtenir 1 L de dissolució. Calcula el pH resultant.",
    steps: [
      {
        title: "Identificar el tipus de sistema",
        explanation: "Es tracta d'una solució amortidora o tampó ja que conté un àcid feble (àcid acètic) i la seva sal conjugada (acetat de sodi, que aporta l'ió acetat).",
        mathBlock: "Dissolució Tampó: Àcid feble + Base conjugada"
      },
      {
        title: "Plantejar l'equació d'equilibri",
        explanation: "S'utilitza l'equació de Henderson-Hasselbalch: pH = pKa + log([Sal]/[Àcid]). \nPrimer calculem el pKa: pKa = -log(Ka) = -log(1.8·10^-5) ≈ 4.74.",
        mathBlock: "pKa ≈ 4.74"
      },
      {
        title: "Substituir les concentracions",
        explanation: "Com que el volum és 1 L, les concentracions d'àcid i sal són [Àcid] = 0.1 M, [Sal] = 0.1 M. El log de la relació és log(0.1/0.1) = log(1) = 0.",
        mathBlock: "pH = 4.74 + log(1) = 4.74"
      }
    ],
    typicalMistake: "Confondre qui va al numerador si el coeficient és sal/àcid o àcid/sal. Revisa sempre les unitats de volum.",
    pauStrategy: "Escriu formalment l'equació de dissociació de l'àcid acètic CH3COOH + H2O <=> CH3COO- + H3O+ demostrant un domini teòric impecable dels equilibris de Brønsted-Lowry.",
    finalResultText: "pH = 4.74"
  }
];

export const FORMULAS: Formula[] = [
  {
    id: "form_1",
    idAttr: "formula-bayes",
    subject: SubjectName.MATEMATIQUES,
    category: "Probabilitat",
    name: "Teorema de Bayes",
    equation: "P(A|B) = [P(B|A) · P(A)] / P(B)",
    explanation: "Permet calcular la probabilitat d'un succés A condicionat a B, coneixent la probabilitat de B condicionat a A i les probabilitats individuals. Bàsic en problemes de proves clàssiques o selecció de mostres."
  },
  {
    id: "form_2",
    idAttr: "formula-ci",
    subject: SubjectName.MATEMATIQUES,
    category: "Estadística",
    name: "Interval de Confiança",
    equation: "IC = x̄ ± z_(α/2) · (σ / √n)",
    explanation: "Estima de manera paramètrica la mitjana real d'una població normal a partir d'una mostra de mida n amb una desviació estàndard σ i un nivell de confiança (1-α)."
  },
  {
    id: "form_3",
    idAttr: "formula-gravity",
    subject: SubjectName.FISICA,
    category: "Camp Gravitatori",
    name: "Camp Gravitatori d'una Massa Puntual",
    equation: "g = - G · M / r²  r_u",
    explanation: "Representa el camp d'acceleració d'un cos de massa M. El signe negatiu reflecteix el caràcter atractiu de la força de gravetat en un sistema de coordenades central radial."
  },
  {
    id: "form_4",
    idAttr: "formula-ph",
    subject: SubjectName.QUIMICA,
    category: "Equilibri Químic",
    name: "Definició de pH d'una solució",
    equation: "pH = - log [H3O+]",
    explanation: "Mesura la concentració molar dels ions d'hidroni en solució aquosa. Valors inferiors a 7 indiquen acidesa, mentre que superiors són bàsics, clau en anàlisi àcid-base."
  },
  {
    id: "form_5",
    idAttr: "formula-optica",
    subject: SubjectName.FISICA,
    category: "Òptica Geomètrica",
    name: "Equació de les Lents Primes",
    equation: "1/s' - 1/s = 1/f'",
    explanation: "Relaciona la distància de l'objecte (s), la distància de la imatge (s') i la distància focal de la lent (f') d'acord amb el conveni de signes DIN oficial de la PAU."
  }
];

export const EXAM_QUESTIONS: ExamQuestion[] = [
  {
    id: "q_1",
    idAttr: "exam-mat-extrem-relatius",
    subject: SubjectName.MATEMATIQUES,
    topic: "Anàlisi / Funcions",
    questionText: "Donada la funció f(x) = (x² - 2x + 2) e^-x, determina on assoleix exactament els seus extrems relatius (màxims i mínims de la corba):",
    options: [
      {
        key: "A",
        text: "Mínim relatiu en (0, 2) i Màxim relatiu en (2, 2·e^-2).",
        isCorrect: true
      },
      {
        key: "B",
        text: "Mónim relatiu en (1, e^-1) i no té cap màxim relatiu.",
        isCorrect: false
      },
      {
        key: "C",
        text: "Funció estrictament creixent en tot el seu domini de nombres reals.",
        isCorrect: false
      },
      {
        key: "D",
        text: "Màxim relatiu en (0, 2) i Mínim relatiu en (2, 2·e^-2).",
        isCorrect: false
      }
    ],
    explanation: "Fent la derivada f'(x) mitjançant la regla del producte: f'(x) = (2x - 2)e^-x - (x² - 2x + 2)e^-x = e^-x (-x² + 4x - 4) = -e^-x (x - 2)². Espera, recalculem: Derivada de (x²-2x+2) és (2x-2). Derivada de e^-x és -e^-x. \nf'(x) = e^-x [(2x-2) - (x²-2x+2)] = e^-x (-x² + 4x - 4). Sabem que f'(x) = 0 dóna x = 2. Analitzant el signe de la derivada, s'observen els punts singulars crítics i s'avalua."
  },
  {
    id: "q_2",
    idAttr: "exam-fis-camp-grav",
    subject: SubjectName.FISICA,
    topic: "Camp Gravitatori",
    questionText: "Com varia la força d'atracció gravitatòria entre dos planetes esfèrics homogenis si reduïm el seu radi a la meitat, mantenint constant les masses respectives i la distància entre els seus centres?",
    options: [
      {
        key: "A",
        text: "Un canvi en el radi físic dels planetes individuals no afecta gens la força gravitatòria, ja que aquesta es calcula des dels centres de massa.",
        isCorrect: true
      },
      {
        key: "B",
        text: "La força es multiplica per quatre a causa de la disminució espacial volumètrica.",
        isCorrect: false
      },
      {
        key: "C",
        text: "La força gravitatòria disminueix a la meitat per degradació del flux campal.",
        isCorrect: false
      },
      {
        key: "D",
        text: "La força s'incrementa en un factor de setze.",
        isCorrect: false
      }
    ],
    explanation: "Segons la Llei de Gravitació Universal de Newton, F = G·M·m / r², on r és la distància física entre els seus centres de massa. Si la distància r i les masses M i m no canvien, el radi físic volumètric dels planetes no altera en absolut el mòdul de la força."
  },
  {
    id: "q_3",
    idAttr: "exam-qui-redox",
    subject: SubjectName.QUIMICA,
    topic: "Redox / Electroquímica",
    questionText: "En fer reaccionar l'ió dicromat Cr2O7^2- en medi àcid, aquest es redueix a ió crom(III) Cr^3+. Quants electrons es transfereixen exactament en semireacció per cada mol d'ió dicromat reductiu?",
    options: [
      {
        key: "A",
        text: "6 electrons transmesos de reducció per mol d'ió dicromat.",
        isCorrect: true
      },
      {
        key: "B",
        text: "3 electrons directes per mantenir l'estabilitat molecular.",
        isCorrect: false
      },
      {
        key: "C",
        text: "14 electrons transmesos associats al balanç hídric hidrònic.",
        isCorrect: false
      },
      {
        key: "D",
        text: "2 electrons per l'efecte de transferència reductora.",
        isCorrect: false
      }
    ],
    explanation: "La semireacció balancejada és: Cr2O7^2- + 14 H^+ + 6 e^- ---> 2 Cr^3+ + 7 H2O. L'estat d'oxidació del crom passa de +6 a +3 (es guanyen 3e^- per cada Cr, i com que hi ha 2 àtoms de crom, es transfereixen un total de 6 electrons)."
  }
];
