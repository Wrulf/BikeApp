/**
 * Description: Creates a test .csv file to be used as base for test database entries.
 */

// Import file system tools module
const fs = require("fs"); 

// Import paths tool module
const path = require("path");

// Make array of test data:
// Note the data has 83entries
// 3 entries will be fileterd due to: 'Covered distance (m)'< 10 or 'Duration (sec.)' < 10
const data = [
    [
      'Departure',
      'Return',
      'Departure station id',
      'Departure station name',
      'Return station id',
      'Return station name',
      'Covered distance (m)',
      'Duration (sec.)'
    ],
    ['2021-05-31 23:57:25', '2021-06-01 0:05:46', 94, 'Laajalahden aukio', 100, 'Teljäntie', 2043, 500],
    ['2021-05-31 23:56:59', '2021-06-01 0:07:14', 82, 'Töölöntulli', 113, 'Pasilan asema', 1870, 611],
    ['2021-05-31 23:56:44', '2021-06-01 0:03:26', 123, 'Näkinsilta', 121, 'Vilhonvuorenkatu', 1025, 399],
    ['2021-05-31 23:56:23', '2021-06-01 0:29:58', 4, 'Viiskulma', 65, 'Hernesaarenranta', 366, 2009],   
    ['2021-05-31 23:56:11', '2021-06-01 0:02:02', 4, 'Viiskulma', 65, 'Hernesaarenranta', 1400, 9],   // Will be fileterd out in csv to database 
    ['2021-05-31 23:54:48', '2021-06-01 0:00:57', 292, 'Koskelan varikko', 133, 'Paavalinpuisto', 1713, 366],
    ['2021-05-31 23:54:11', '2021-06-01 0:17:11', 34, 'Kansallismuseo', 81, 'Stenbäckinkatu', 2550, 1377],
    ['2021-05-31 23:53:04', '2021-06-01 0:14:52', 240, 'Viikin normaalikoulu', 281, 'Puotila (M)', 5366, 1304],
    ['2021-05-31 23:52:03', '2021-06-01 0:15:16', 116, 'Linnanmäki', 117, 'Brahen puistikko', 3344, 1393],
    ['2021-05-31 23:50:19', '2021-06-01 0:05:58', 116, 'Linnanmäki', 145, 'Pohjolankatu', 3248, 935],
    ['2021-05-31 23:50:05', '2021-06-01 0:01:22', 147, 'Käpylän asema', 232, 'Oulunkylän asema', 1633, 672],
    ['2021-05-31 23:50:00', '2021-05-31 23:55:48', 69, 'Kalevankatu', 62, 'Välimerenkatu', 1131, 345],
    ['2021-05-31 23:49:59', '2021-05-31 23:59:49', 147, 'Käpylän asema', 232, 'Oulunkylän asema', 1695, 589],
    ['2021-05-31 23:49:59', '2021-05-31 23:55:38', 69, 'Kalevankatu', 62, 'Välimerenkatu', 1125, 336],
    ['2021-05-31 23:49:36', '2021-06-01 0:40:20', 547, 'Jämeräntaival', 547, 'Jämeräntaival', 1227, 3040],
    ['2021-05-31 23:49:18', '2021-06-01 0:05:09', 201, 'Länsisatamankuja', 41, 'Ympyrätalo', 4245, 948],
    ['2021-05-31 23:48:53', '2021-06-01 0:03:49', 30, 'Itämerentori', 50, 'Melkonkuja', 2656, 892],
    ['2021-05-31 23:48:44', '2021-05-31 23:56:06', 235, 'Katariina Saksilaisen katu', 239, 'Viikin tiedepuisto', 2107, 437],
    ['2021-05-31 23:47:49', '2021-05-31 23:51:11', 727, 'Ratsutori', 713, 'Upseerinkatu', 549, 198],
    ['2021-05-31 23:46:14', '2021-05-31 23:55:58', 137, 'Arabian kauppakeskus', 44, 'Sörnäinen (M)', 1970, 582],
    ['2021-05-30 9:42:36', '2021-05-30 9:55:59', 36, 'Apollonkatu', 116, 'Linnanmäki', 2607, 800],
    ['2021-05-30 9:42:33', '2021-05-30 9:46:53', 240, 'Viikin normaalikoulu', 241, 'Agronominkatu', 843, 258],
    ['2021-05-30 9:42:24', '2021-05-30 9:42:45', 509, 'Revontulentie', 509, 'Revontulentie', 0, 17],      // will be fileterd out
    ['2021-05-30 9:42:20', '2021-05-30 9:59:02', 737, 'Muurarinkuja', 701, 'Gallen-Kallelan tie', 3496, 990],
    ['2021-05-30 9:42:18', '2021-05-30 10:03:46', 243, 'Mustikkamaa', 87, 'Kustaankatu', 3898, 1284],
    ['2021-05-29 21:25:32', '2021-05-29 21:53:57', 40, 'Hakaniemi (M)', 95, 'Munkkiniemen aukio', 5338, 1704],
    ['2021-05-29 21:25:26', '2021-05-29 21:41:46', 591, 'Mellstenintie', 585, 'Haukilahdenaukio', 896, 975],
    ['2021-05-29 21:25:14', '2021-05-29 21:47:39', 126, 'Kalasatama (M)', 4, 'Viiskulma', 4649, 1341],
    ['2021-05-29 21:25:12', '2021-05-29 21:33:44', 20, 'Kaisaniemenpuisto', 41, 'Ympyrätalo', 1419, 511],
    ['2021-05-29 21:25:07', '2021-05-29 21:36:19', 90, 'Paciuksenkaari', 163, 'Lehtisaarentie', 2975, 667],
    ['2021-05-29 21:24:58', '2021-05-29 21:54:12', 213, 'Huopalahden asema', 109, 'Hertanmäenkatu', 2764, 1750],
    ['2021-05-29 21:24:51', '2021-05-29 21:45:47', 93, 'Torpanranta', 541, 'Aalto-yliopisto (M), Korkeakouluaukio', 3996, 1250], 
    ['2021-05-29 16:49:41', '2021-05-29 17:01:13', 127, 'Teurastamo', 130, 'Teollisuuskatu', 1850, 687],
    ['2021-05-29 16:49:40', '2021-05-29 16:57:29', 625, 'Suomenlahdentie', 587, 'Hauenkallio', 1613, 467],
    ['2021-05-29 16:49:40', '2021-05-29 17:17:50', 91, 'Seurasaari', 201, 'Länsisatamankuja', 5613, 1686],
    ['2021-05-29 16:49:38', '2021-05-29 16:56:28', 122, 'Lintulahdenkatu', 126, 'Kalasatama (M)', 1211, 408],
    ['2021-05-29 16:49:37', '2021-05-29 17:01:56', 136, 'Sofianlehdonkatu', 147, 'Käpylän asema', 2056, 732],
    ['2021-05-29 16:49:35', '2021-05-29 17:06:35', 144, 'Käpyläntie', 126, 'Kalasatama (M)', 3642, 1016],
    ['2021-05-29 16:49:35', '2021-05-30 14:34:58', 344, 'Puistolan asema', 350, 'Töyrynummi', 3197, 78320],
    ['2021-05-29 16:49:34', '2021-05-29 16:49:55', 30, 'Itämerentori', 30, 'Itämerentori', 2, 5],      // will be fileterd out
    ['2021-05-29 16:49:34', '2021-05-29 17:11:26', 91, 'Seurasaari', 28, 'Lastenlehto', 4672, 1308],
    ['2021-05-29 16:49:33', '2021-05-29 16:59:04', 313, 'Rastila (M)', 314, 'Lokitie', 1204, 566],
    ['2021-05-29 16:49:32', '2021-05-29 17:05:28', 22, 'Rautatientori / länsi', 120, 'Mäkelänkatu', 3555, 952],
    ['2021-05-29 16:49:29', '2021-05-29 17:05:13', 140, 'Verkatehtaanpuisto', 126, 'Kalasatama (M)', 4045, 939],
    ['2021-05-29 16:49:27', '2021-05-29 17:05:25', 132, 'Hollolantie', 124, 'Isoisänsilta', 2516, 955],
    ['2021-05-20 19:40:56', '2021-05-20 19:47:38', 245, 'Kulosaari (M)', 256, 'Herttoniemenranta', 1345, 399],
    ['2021-05-20 19:40:50', '2021-05-20 19:51:29', 45, 'Brahen kenttä', 142, 'Koskelantie', 2781, 636],
    ['2021-05-20 19:40:49', '2021-05-20 19:51:28', 45, 'Brahen kenttä', 142, 'Koskelantie', 2910, 637],
    ['2021-05-20 19:40:37', '2021-05-20 19:44:29', 46, 'Diakoniapuisto', 41, 'Ympyrätalo', 857, 227],
    ['2021-05-20 19:40:21', '2021-05-20 19:49:29', 24, 'Mannerheimintie', 62, 'Välimerenkatu', 1948, 544],
    ['2021-05-20 19:40:17', '2021-05-20 19:48:34', 58, 'Lauttasaarensilta', 30, 'Itämerentori', 1421, 487],
    ['2021-05-20 19:40:13', '2021-05-20 19:48:26', 58, 'Lauttasaarensilta', 30, 'Itämerentori', 1445, 488],
    ['2021-05-20 19:40:11', '2021-05-20 20:04:42', 262, 'Siilitie (M)', 330, 'Kontula (M)', 5507, 1466],
    ['2021-05-20 19:40:05', '2021-05-20 19:46:28', 541, 'Aalto-yliopisto (M), Korkeakouluaukio', 551, 'Tietäjä', 1530, 382], 
    ['2021-05-20 19:40:01', '2021-05-20 19:48:42', 731, 'Leppävaarankäytävä', 749, 'Vallikatu', 1037, 520],
    ['2021-05-20 19:39:54', '2021-05-20 19:50:49', 547, 'Jämeräntaival', 519, 'Tapionaukio', 2307, 650],
    ['2021-05-20 19:39:54', '2021-05-20 19:47:02', 513, 'Hakalehto', 581, 'Niittykumpu (M)', 1676, 424],
    ['2021-05-20 19:39:46', '2021-05-20 19:49:53', 131, 'Elimäenkatu', 126, 'Kalasatama (M)', 2303, 602],
    ['2021-05-20 9:49:13', '2021-05-20 10:10:47', 4, 'Viiskulma', 52, 'Heikkilänaukio', 4554, 1292],
    ['2021-05-20 9:49:11', '2021-05-20 10:09:07', 44, 'Sörnäinen (M)', 25, 'Narinkka', 3344, 1192],
    ['2021-05-20 9:49:10', '2021-05-20 10:00:11', 116, 'Linnanmäki', 38, 'Töölöntori', 1833, 657],
    ['2021-05-20 9:49:09', '2021-05-20 9:56:47', 275, 'Itäkeskus (M)', 280, 'Puotilan ostoskeskus', 1480, 454],
    ['2021-05-20 9:49:05', '2021-05-20 10:05:57', 705, 'Laajalahden keskus', 521, 'Kulttuuriaukio', 3375, 1011],
    ['2021-05-20 9:49:04', '2021-05-20 9:59:55', 124, 'Isoisänsilta', 123, 'Näkinsilta', 2662, 647],
    ['2021-05-20 9:49:03', '2021-05-20 9:54:59', 727, 'Ratsutori', 723, 'Säterinniitty', 937, 351],
    ['2021-05-20 9:49:02', '2021-05-20 10:07:23', 75, 'Korjaamo', 64, 'Tyynenmerenkatu', 3338, 1096],
    ['2021-05-20 9:49:00', '2021-05-20 9:57:55', 225, 'Maunula', 221, 'Thalianaukio', 2530, 531],
    ['2021-05-22 0:02:05', '2021-05-22 0:15:14', 31, 'Marian sairaala', 57, 'Lauttasaaren ostoskeskus', 2427, 784],
    ['2021-05-22 0:01:57', '2021-05-22 0:13:40', 531, 'Keilaranta', 95, 'Munkkiniemen aukio', 3882, 702],
    ['2021-05-22 0:01:54', '2021-05-22 0:09:11', 19, 'Rautatientori / itä', 29, 'Baana', 1784, 433],
    ['2021-05-22 0:01:45', '2021-05-22 0:08:13', 63, 'Jätkäsaarenlaituri', 36, 'Apollonkatu', 1613, 384],
    ['2021-05-22 0:01:44', '2021-05-22 0:08:06', 63, 'Jätkäsaarenlaituri', 36, 'Apollonkatu', 1666, 383],
    ['2021-05-22 0:01:25', '2021-05-22 0:10:31', 115, 'Venttiilikuja', 46, 'Diakoniapuisto', 1124, 545],
    ['2021-05-22 0:01:08', '2021-05-22 0:04:59', 25, 'Narinkka', 37, 'Töölönkatu', 955, 226],
    ['2021-05-22 0:01:06', '2021-05-22 0:08:06', 63, 'Jätkäsaarenlaituri', 36, 'Apollonkatu', 1600, 416],
    ['2021-05-22 0:00:49', '2021-05-22 0:17:05', 36, 'Apollonkatu', 88, 'Kiskontie', 3442, 972],
    ['2021-05-22 0:00:45', '2021-05-22 0:08:53', 15, 'Ritarikatu', 2, 'Laivasillankatu', 1315, 483],
    ['2021-05-22 0:00:30', '2021-05-22 0:04:37', 78, 'Messeniuksenkatu', 78, 'Messeniuksenkatu', 600, 242], 
    ['2021-05-22 0:00:19', '2021-05-22 0:06:30', 757, 'Painiitty', 751, 'Vallipolku', 1243, 368],
    ['2021-05-22 0:00:10', '2021-05-22 0:15:09', 40, 'Hakaniemi (M)', 120, 'Mäkelänkatu', 2852, 894],
    ['2021-05-21 23:59:49', '2021-05-22 0:24:34', 82, 'Töölöntulli', 142, 'Koskelantie', 3577, 1481],
    ['2021-05-21 23:59:48', '2021-05-22 0:12:06', 264, 'Eränkävijäntori', 274, 'Voikukantie', 3375, 734],
    ['2021-05-21 23:59:44', '2021-05-22 0:12:57', 264, 'Eränkävijäntori', 274, 'Voikukantie', 3377, 790],

] 
  
  

// Convert data array to csv format, taking into account if a string element has a "," within it
const csv = data.map(row => row.map(item => typeof item === 'string' && item.includes(',') ? `"${item}"` : item).join(',')).join('\n');

// Specify the file path using path.join()
const filePath = path.join(__dirname, '..', 'data', 'testTripsData.csv');


// Write the csv data to a file
fs.writeFile(filePath, csv, err => {
  if (err) {
    console.error('Error writing to file:', err);
  } else {
    console.log('CSV file created successfully!');
  }
});