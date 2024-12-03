import * as THREE from 'three';

/**
 * All infos came from metmuseum
 * https://www.metmuseum.org/
 */

export const paintingsInfos = [
  {
    name: 'haystack-snow-effect.jpg',
    title: 'Haystacks (Effect of Snow and Sun)',
    made: '1891',
    artist: 'Claude Monet',
    artistInfos: 'French, Paris 1840–1926 Giverny',
    medium: 'Oil on canvas',
    dimensions: '25 3/4 x 36 1/4 in. (65.4 x 92.1 cm)',
    description: 'Between 1890 and 1891 Monet devoted some thirty paintings to the haystacks in a field near his house\n' +
      '                    at\n' +
      '                    Giverny. In the midst of this effort, he wrote to the critic Gustave Geoffroy: "I am working very\n' +
      '                    hard,\n' +
      '                    struggling with a series of different effects (haystacks), but at this season the sun sets so fast I\n' +
      '                    cannot follow it. . . . The more I continue, the more I see that a great deal of work is necessary in\n' +
      '                    order to succeed in rendering what I seek." Haystacks was the first group of paintings that Monet\n' +
      '                    exhibited as a series; in 1891, fifteen were shown at the Galerie Durand-Ruel in Paris.',
    position: [-8.39, 2.37, 6.59],
    rotation: [0,0,0],
    cartel: {
      cartelPath: 'haystack-snow-effect-cartel.jpg',
      positionCartel: [-7.74, 2.17, 6.59],
      rotationCartel: [0, 0, 0],
    },
    cameraPos: {
      x: -8.39,
      y: 2.37,
      z: 7.59
    }
  },
  {
    name: 'spring.jpg',
    title: 'Spring (Fruit Trees in Bloom)',
    made: '1873',
    artist: 'Claude Monet',
    artistInfos: 'French, Paris 1840–1926 Giverny',
    medium: 'Oil on canvas',
    dimensions: '24 1/2 x 39 5/8 in. (62.2 x 100.6 cm)',
    description: 'Monet made this work in the vicinity of his home in Argenteuil, a village on the Seine northwest of Paris ' +
      'that was a favorite gathering place of the Impressionists. Although the scene has previously been called Plum Blossoms ' +
      'and Apples Trees in Bloom, the type of tree cannot be determined from the flurry of white buds evoked by the artist. ' +
      'The pastel shades of spring and the clear light inspired him to represent nature almost purely in terms of color. ' +
      'This was the first painting by Monet to enter the Museum’s collection, via bequest in 1926.',
    position: [0.3, 2.37, 9.874],
    rotation: [0, THREE.MathUtils.degToRad(-28.9), 0],
    cartel: {
      cartelPath: 'spring-cartel.jpg',
      positionCartel: [0.84, 2.17, 10.22],
      rotationCartel: [0, THREE.MathUtils.degToRad(-28.9), 0],
    },
    cameraPos: {
      x: -0.3,
      y: 2.37,
      z: 10.874
    }
  },
  {
    name: 'poppy-fields-argenteuil.jpg',
    title: 'Poppy Fields near Argenteuil',
    made: '1875',
    artist: 'Claude Monet',
    artistInfos: 'French, Paris 1840–1926 Giverny',
    medium: 'Oil on canvas',
    dimensions: '21 1/4 x 29 in. (54 x 73.7 cm)',
    description: 'This work is one of four similar views of the plain of ' +
      'Gennevilliers, just southeast of Argenteuil, which Monet executed in the ' +
      'summer of 1875. He first painted the subject two years earlier in the celebrated ' +
      'Poppies near Argenteuil (Musée d\'Orsay, Paris).',
    position: [-6.59, 2.37, 1.96],
    rotation: [0,0,0],
    cartel: {
      cartelPath: 'poppy-fields-argenteuil-cartel.jpg',
      positionCartel: [-5.94, 2.17, 1.96],
      rotationCartel: [0, 0, 0],
    },
    cameraPos: {
      x: -6.59,
      y: 2.37,
      z: 2.96
    }
  },
  {
    name: 'bodmer.jpg',
    title: 'The Bodmer Oak, Fontainebleau Forest',
    made: '1865',
    artist: 'Claude Monet',
    artistInfos: 'French, Paris 1840–1926 Giverny',
    medium: 'Oil on canvas',
    dimensions: '37 7/8 x 50 7/8 in. (96.2 x 129.2 cm)',
    description: 'The Forest of Fontainebleau, south of Paris, became an artistic hot spot in the 1830s. One popular motif was the Bodmer Oak,' +
      ' named after Swiss artist Karl Bodmer (1809–1893), who exhibited a painting of the tree at the Salon of 1850. Monet used bright yellows,' +
      ' greens, and oranges to depict sunlight filtering through the canopy of branches. The carpet of russet leaves signals that he painted this' +
      ' view just before he concluded a months-long visit to Fontainebleau in October 1865. It is probably the last of several landscapes related ' +
      'to his monumental Luncheon on the Grass (1865–66; Musée d’Orsay, Paris), which is set in a sunny woodland glade.',
    position: [2.12, 2.37, 5.265],
    rotation: [0, THREE.MathUtils.degToRad(-28.9), 0],
    cartel: {
      cartelPath: 'bodmer-cartel.jpg',
      positionCartel: [2.7, 2.17, 5.58],
      rotationCartel: [0, THREE.MathUtils.degToRad(-28.9), 0],
    },
    cameraPos: {
      x: 1.65,
      y: 2.37,
      z: 6.12,
    }
  },
  {
    name: 'camille-monet.jpg',
    title: 'Camille Monet (1847–1879) on a Garden Bench',
    made: '1873',
    artist: 'Claude Monet',
    artistInfos: 'French, Paris 1840–1926 Giverny',
    medium: 'Oil on canvas',
    dimensions: '23 7/8 x 31 5/8 in. (60.6 x 80.3 cm)',
    description: 'Monet’s wife, Camille Doncieux, is as easily identifiable here as the mounds of geraniums ' +
      'in the garden of the couple’s house at Argenteuil. The same is true of her smart ensemble: the velvet ' +
      'and damask outfit closely resembles the look for spring 1873, as advertised in the March issue of the ' +
      'fashion periodical La Mode Illustré. Less clear is the nature of this enigmatic scene. Painted the year ' +
      'Camille’s father died, she telegraphs sadness while holding a note in her gloved hand. The tophatted gentleman, ' +
      'later identified as a neighbor, has perhaps called to offer his condolences and a consoling bouquet.',
    position: [-4.79, 2.37, -2.67],
    rotation: [0,0,0],
    cartel: {
      cartelPath: 'camille-monet-cartel.jpg',
      positionCartel: [-4.14, 2.17, -2.67],
      rotationCartel: [0, 0, 0],
    },
    cameraPos: {
      x: -4.79,
      y: 2.37,
      z: -1.67
    }
  },
  {
    name: 'the-monet-family.jpg',
    title: 'The Monet Family in Their Garden at Argenteuil',
    made: '1874',
    artist: 'Claude Monet',
    artistInfos: 'French, Paris 1840–1926 Giverny',
    medium: 'Oil on canvas',
    dimensions: '24 x 39 1/4 in. (61 x 99.7 cm)',
    description: 'In July and August 1874 Manet vacationed at his family’s house in Gennevilliers, just across the Seine from Monet at Argenteuil. ' +
      'The two painters saw each other often that summer, and on a number of occasions they were joined by Renoir. While Manet was painting this ' +
      'picture of Monet with his wife Camille and their son Jean, Monet painted Manet at his easel (location unknown). Renoir, who arrived just as' +
      ' Manet was beginning to work, borrowed paint, brushes, and canvas, positioned himself next to Manet, and painted Madame Monet and Her Son ' +
      '(National Gallery of Art, Washington, D.C.).',
    position: [3.94, 2.37, 0.656],
    rotation: [0, THREE.MathUtils.degToRad(-28.9), 0],
    cartel: {
      cartelPath: 'the-monet-family-cartel.jpg',
      positionCartel: [4.56, 2.17, 0.99],
      rotationCartel: [0, THREE.MathUtils.degToRad(-28.9), 0],
    },
    cameraPos: {
      x: 3.4,
      y: 2.37,
      z: 1.561
    }
  },
  {
    name: 'garden-saint-adresse.jpg',
    title: 'Garden at Sainte-Adresse',
    made: '1867',
    artist: 'Claude Monet',
    artistInfos: 'French, Paris 1840–1926 Giverny',
    medium: 'Oil on canvas',
    dimensions: '38 5/8 x 51 1/8 in. (98.1 x 129.9 cm)',
    description: 'Monet spent the summer of 1867 with his family at Sainte-Adresse, a seaside resort near Le Havre. ' +
      'It was there that he painted this buoyant, sunlit scene of contemporary leisure, enlisting his father (shown ' +
      'seated in a panama hat) and other relatives as models. By adopting an elevated viewpoint and painting the terrace, ' +
      'sea, and sky as three distinct bands of high-keyed color, Monet emphasized the flat surface of the canvas. ' +
      'His approach—daring for its time—reflects his admiration for Japanese prints. Twelve years after it was made, ' +
      'Monet exhibited the picture at the fourth Impressionist exhibition of 1879 as Jardin à Sainte-Adresse.',
    position: [-2.99, 2.37, -7.3],
    rotation: [0,0,0],
    cartel: {
      cartelPath: 'garden-saint-adresse-cartel.jpg',
      positionCartel: [-2.34, 2.17, -7.3],
      rotationCartel: [0, 0, 0],
    },
    cameraPos: {
      x: -2.99,
      y: 2.37,
      z: -6.3
    }
  },
  {
    name: 'nervia.jpg',
    title: 'The Valley of the Nervia',
    made: '1884',
    artist: 'Claude Monet',
    artistInfos: 'French, Paris 1840–1926 Giverny',
    medium: 'Oil on canvas',
    dimensions: '26 x 32 in. (66 x 81.3 cm)',
    description: 'Monet spent three months on the Italian Riviera in early 1884. He wrote a friend, "everything is superb and I want ' +
      'to paint it all … there are many experiments to make. This landscape is a new experience for me." Installing himself in the ' +
      'coastal town of Bordighera, Monet explored the scenic terrain. Here, he employed light, bright tones to depict the snowy Maritime' +
      ' Alps along the border with France. Nestled among the hills is the village of Camporosso, on the banks of the Nervia, not far from ' +
      'the river’s outlet in the Mediterranean Sea.',
    position: [5.8, 2.37, -3.952],
    rotation: [0, THREE.MathUtils.degToRad(-28.9), 0],
    cartel: {
      cartelPath: 'nervia-cartel.jpg',
      positionCartel: [6.42, 2.17, -3.612],
      rotationCartel: [0, THREE.MathUtils.degToRad(-28.9), 0],
    },
    cameraPos: {
      x: 5.28,
      y: 2.37,
      z: -3.052
    }
  },
  {
    name: 'la-grenouillere.jpg',
    title: 'La Grenouillère',
    made: '1869',
    artist: 'Claude Monet',
    artistInfos: 'French, Paris 1840–1926 Giverny',
    medium: 'Oil on canvas',
    dimensions: '29 3/8 x 39 1/4 in. (74.6 x 99.7 cm)',
    description: 'During the summer of 1869, Monet and Renoir set up their easels at La Grenouillère, a boating and bathing resort' +
      ' on the Seine River, not far from Paris. Monet noted on September 25, "I do have a dream, a painting, the baths of La Grenouillère,' +
      ' for which I have made some bad sketches, but it is only a dream. Renoir, who has just spent two months here, also wants to do this painting."' +
      ' Among their various depictions of the subject, this composition closely resembles one by Renoir in the Nationalmuseum, Stockholm.',
    position: [-1.19, 2.37, -11.93],
    rotation: [0,0,0],
    cartel: {
      cartelPath: 'la-grenouillere-cartel.jpg',
      positionCartel: [-0.54, 2.17, -11.93],
      rotationCartel: [0, 0, 0],
    },
    cameraPos: {
      x: -1.19,
      y: 2.37,
      z: -10.93
    }
  },
  {
    name: 'green-wave.jpg',
    title: 'The Green Wave',
    made: '1866–67',
    artist: 'Claude Monet',
    artistInfos: 'French, Paris 1840–1926 Giverny',
    medium: 'Oil on canvas',
    dimensions: '9 1/8 x 25 1/2 in. (48.6 x 64.8 cm)',
    description: 'When this early seascape debuted at the 1879 Impressionist exhibition, a critic remarked that it was "directly influenced by Manet."' +
      ' The handling of paint and the composition, especially the high horizon line, echo Manet\'s depictions of American warships, The "Kearsarge" at ' +
      'Boulogne (1999.442) and The Battle of the "Kearsarge" and the "Alabama" (Philadelphia Museum of Art), which Monet may have seen on exhibition in Paris' +
      ' in 1865 and 1867. He later—and incorrectly—dated the present work to 1865. In fact, he visited the Normandy coast in 1866 and 1867.',
    position: [7.5, 2.37, -8.6],
    rotation: [0, THREE.MathUtils.degToRad(-28.9), 0],
    cartel: {
      cartelPath: 'green-wave-cartel.jpg',
      positionCartel: [8.14, 2.17, -8.25],
      rotationCartel: [0, THREE.MathUtils.degToRad(-28.9), 0],
    },
    cameraPos: {
      x: 7,
      y: 2.37,
      z: -7.7
    }
  },
]