const bundles = [
    {
        name: "Forged White Detective",
        price: "Lottery - Limited",
        permanent: true,
        parts: 5,
        expBonus: null,
        stats: {
            "1 Set": "Defense +6%",
            "2 Set": "HP +5%",
            "3 Set": "Explo Res +4%",
            "4 Set": "Movement Speed +4%",
            "5 Set": "Defense +4%",
            "6 Set": "",
            "7 Set": ""
        },
        image: "src/imagens/bundles/forged_detective.png"
    },
    {
        name: "Sweatshirts",
        price: "Lottery - Limited",
        permanent: true,
        parts: 6,
        expBonus: null,
        stats: {
            "1 Set": "Bullet Speed +6%",
            "2 Set": "Rate of Fire +5%",
            "3 Set": "Attack Power +3%",
            "4 Set": "Range +4%",
            "5 Set": "HP +4%",
            "6 Set": "Movement Speed +6%",
            "7 Set": ""
        },
        image: "src/imagens/bundles/sweatshirt.png"
    },
    {
        name: "Newbie Pajamas 7D",
        price: 1.00,
        permanent: false,
        parts: 4,
        expBonus: null,
        stats: {
            "1 Set": "",
            "2 Set": "",
            "3 Set": "",
            "4 Set": "",
            "5 Set": "",
            "6 Set": "",
            "7 Set": ""
        },
        image: "src/imagens/bundles/newbie_pajamas.png"
    },
    {
        name: "Beach Set Bundle",
        price: 188.00,
        permanent: true,
        parts: 0,
        stats: {
            "1 Set": "",
            "2 Set": "",
            "3 Set": "",
            "4 Set": "",
            "5 Set": "",
            "6 Set": "",
            "7 Set": ""
        },
        image: "src/imagens/bundles/beach_set.png"
    },
    {
        name: "Panda Set",
        price: 188.00,
        permanent: true,
        parts: 5,
        stats: {
            "1 Set": "Explo Res +3%",
            "2 Set": "Defense +3%",
            "3 Set": "Movement Speed +3%",
            "4 Set": "HP +2%",
            "5 Set": "HP +2%",
            "6 Set": "",
            "7 Set": ""
        },
        image: "src/imagens/bundles/panda_set.png"
    },
    {
        name: "FCS Squad Leader Costume",
        price: 188.00,
        permanent: true,
        parts: 7,
        expBonus: null,
        stats: {
            "1 Set": "Hit Rate +10%",
            "2 Set": "Range +4%",
            "3 Set": "Rate of Fire +4%",
            "4 Set": "Bullet Speed +5%",
            "5 Set": "HP +3%",
            "6 Set": "Attack Power +3%",
            "7 Set": "Movement Speed +5%"
        },
        image: "src/imagens/bundles/fcs_squad_leader.png"
    },
    {
        name: "Indonesian School Uniform",
        price: 188.00,
        permanent: true,
        parts: 0,
        stats: {
            "1 Set": "",
            "2 Set": "",
            "3 Set": "",
            "4 Set": "",
            "5 Set": "",
            "6 Set": "",
            "7 Set": ""
        },
        image: "src/imagens/bundles/indonesian_school_uniform.png"
    },
    {
        name: "Indonesian Army Uniform",
        price: 188.00,
        permanent: true,
        parts: 0,
        stats: {
            "1 Set": "",
            "2 Set": "",
            "3 Set": "",
            "4 Set": "",
            "5 Set": "",
            "6 Set": "",
            "7 Set": ""
        },
        image: "src/imagens/bundles/indonesian_army_uniform.png"
    },
    {
        name: "US Navy Bundle",
        price: 188.00,
        permanent: true,
        parts: 0,
        stats: {
            "1 Set": "",
            "2 Set": "",
            "3 Set": "",
            "4 Set": "",
            "5 Set": "",
            "6 Set": "",
            "7 Set": ""
        },
        image: "src/imagens/bundles/us_navy.png"
    },
    {
        name: "New Christmas Bundle",
        price: 188.00,
        permanent: true,
        parts: 5,
        stats: {
            "1 Set": "Rate of Fire +4",
            "2 Set": "Bullet Speed +5%",
            "3 Set": "HP +3%",
            "4 Set": "Attack Power +3%",
            "5 Set": "Movement Speed +5%",
            "6 Set": "",
            "7 Set": ""
        },
        image: "src/imagens/bundles/new_christmas.png"
    },
    {
        name: "FCS Bundle",
        price: 188.00,
        permanent: true,
        parts: 6,
        stats: {
            "1 Set": "Range +4%",
            "2 Set": "Bullet Speed +5%",
            "3 Set": "Rate of Fire +4%",
            "4 Set": "HP +3%",
            "5 Set": "Attack Power +3%",
            "6 Set": "Movement Speed +5%",
            "7 Set": ""
        },
        image: "src/imagens/bundles/fcs_bundle.png"
    },
    {
        name: "Police Officer Bundle",
        price: 188.00,
        permanent: true,
        parts: 0,
        stats: {
            "1 Set": "",
            "2 Set": "",
            "3 Set": "",
            "4 Set": "",
            "5 Set": "",
            "6 Set": "",
            "7 Set": ""
        },
        image: "src/imagens/bundles/police_officer.png"
    },
    {
        name: "Thai King Bundle",
        price: 188.00,
        permanent: true,
        parts: 0,
        stats: {
            "1 Set": "",
            "2 Set": "",
            "3 Set": "",
            "4 Set": "",
            "5 Set": "",
            "6 Set": "",
            "7 Set": ""
        },
        image: "src/imagens/bundles/thai_king.png"
    },
    {
        name: "Spring Pack - White Dragon on Black",
        price: 188.00,
        permanent: true,
        parts: 0,
        stats: {
            "1 Set": "",
            "2 Set": "",
            "3 Set": "",
            "4 Set": "",
            "5 Set": "",
            "6 Set": "",
            "7 Set": ""
        },
        image: "src/imagens/bundles/spring_white_dragon.png"
    },
    {
        name: "(Black) Alliance Contact Set",
        price: 188.00,
        permanent: true,
        parts: 0,
        stats: {
            "1 Set": "",
            "2 Set": "",
            "3 Set": "",
            "4 Set": "",
            "5 Set": "",
            "6 Set": "",
            "7 Set": ""
        },
        image: "src/imagens/bundles/black_alliance.png"
    },
    {
        name: "(Green) Wind Alliance Contact Set",
        price: 188.00,
        permanent: true,
        parts: 0,
        stats: {
            "1 Set": "",
            "2 Set": "",
            "3 Set": "",
            "4 Set": "",
            "5 Set": "",
            "6 Set": "",
            "7 Set": ""
        },
        image: "src/imagens/bundles/green_alliance.png"
    },
    {
        name: "(Red) Fire Alliance Contact Set",
        price: 188.00,
        permanent: true,
        parts: 0,
        stats: {
            "1 Set": "",
            "2 Set": "",
            "3 Set": "",
            "4 Set": "",
            "5 Set": "",
            "6 Set": "",
            "7 Set": ""
        },
        image: "src/imagens/bundles/red_alliance.png"
    },
    {
        name: "Kung Fu Master Set",
        price: 188.00,
        permanent: true,
        parts: 4,
        expBonus: null,
        stats: {
            "1 Set": "Bullet Speed +3%",
            "2 Set": "HP +3%",
            "3 Set": "Attack Power +3%",
            "4 Set": "Movement Speed +5%",
            "5 Set": "",
            "6 Set": "",
            "7 Set": ""
        },
        image: "src/imagens/bundles/kung_fu_master.png"
    },
    {
        name: "SWAT Squad Leader Set",
        price: 188.00,
        permanent: true,
        parts: 7,
        expBonus: null,
        stats: {
            "1 Set": "Hit Rate +4%",
            "2 Set": "Range +4%",
            "3 Set": "Rate of Fire +4%",
            "4 Set": "Bullet Speed +3%",
            "5 Set": "HP +3%",
            "6 Set": "Attack Power +3%",
            "7 Set": "Movement Speed +3%"
        },
        image: "src/imagens/bundles/swat_leader.png"
    },
    {
        name: "Korean Outfit Bundle",
        price: 188.00,
        permanent: true,
        parts: 0,
        stats: {
            "1 Set": "",
            "2 Set": "",
            "3 Set": "",
            "4 Set": "",
            "5 Set": "",
            "6 Set": "",
            "7 Set": ""
        },
        image: "src/imagens/bundles/korean_outfit.png"
    },
    {
        name: "US Marine Squad Leader",
        price: 188.00,
        permanent: true,
        parts: 0,
        stats: {
            "1 Set": "",
            "2 Set": "",
            "3 Set": "",
            "4 Set": "",
            "5 Set": "",
            "6 Set": "",
            "7 Set": ""
        },
        image: "src/imagens/bundles/us_marine.png"
    },
    {
        name: "Spartan Set",
        price: 188.00,
        permanent: true,
        parts: 6,
        stats: {
            "1 Set": "Range +4%",
            "2 Set": "Bullet Speed +5%",
            "3 Set": "Rate of Fire +4",
            "4 Set": "HP +3%",
            "5 Set": "Attack Power +3%",
            "6 Set": "Movement Speed +5%",
            "7 Set": ""
        },
        image: "src/imagens/bundles/spartan.png"
    },
    {
        name: "Firefighter Set",
        price: 188.00,
        permanent: true,
        parts: 7,
        expBonus: null,
        stats: {
            "1 Set": "Hit Rate +10%",
            "2 Set": "Range +4%",
            "3 Set": "Rate of Fire +4%",
            "4 Set": "Bullet Speed +5%",
            "5 Set": "HP +3%",
            "6 Set": "Attack Power +3%",
            "7 Set": "Movement Speed +5%"
        },
        image: "src/imagens/bundles/firefighter.png"
    },
    {
        name: "Chinese Zombie Set",
        price: 188.00,
        permanent: true,
        parts: 5,
        expBonus: null,
        stats: {
            "1 Set": "Rate of Fire +4%",
            "2 Set": "Bullet Speed +5%",
            "3 Set": "HP +3%",
            "4 Set": "Attack Power +3%",
            "5 Set": "Movement Speed +5%",
            "6 Set": "",
            "7 Set": ""
        },
        image: "src/imagens/bundles/chinese_zombie.png"
    },
    {
        name: "Ghost Set",
        price: 188.00,
        permanent: true,
        parts: 0,
        stats: {
            "1 Set": "",
            "2 Set": "",
            "3 Set": "",
            "4 Set": "",
            "5 Set": "",
            "6 Set": "",
            "7 Set": ""
        },
        image: "src/imagens/bundles/ghost.png"
    },
    {
        name: "Cat Set",
        price: 188.00,
        permanent: true,
        parts: 7,
        expBonus: null,
        stats: {
            "1 Set": "Hit Rate +10%",
            "2 Set": "Range +4%",
            "3 Set": "Rate of Fire +4%",
            "4 Set": "Bullet Speed +5%",
            "5 Set": "HP +3%",
            "6 Set": "Attack Power +3%",
            "7 Set": "Movement Speed +5%"
        },
        image: "src/imagens/bundles/cat.png"
    },
    {
        name: "GIGN Set",
        price: 188.00,
        permanent: true,
        parts: 0,
        stats: {
            "1 Set": "",
            "2 Set": "",
            "3 Set": "",
            "4 Set": "",
            "5 Set": "",
            "6 Set": "",
            "7 Set": ""
        },
        image: "src/imagens/bundles/gign.png"
    },
    {
        name: "Western Friends Set",
        price: 188.00,
        permanent: true,
        parts: 4,
        stats: {
            "1 Set": "Rate of Fire +5%",
            "2 Set": "HP +3%",
            "3 Set": "Attack Power +3%",
            "4 Set": "Movement Speed +5%",
            "5 Set": "",
            "6 Set": "",
            "7 Set": ""
        },
        image: "src/imagens/bundles/western_friends.png"
    },
    {
        name: "ACU Set",
        price: 188.00,
        permanent: true,
        parts: 0,
        stats: {
            "1 Set": "",
            "2 Set": "",
            "3 Set": "",
            "4 Set": "",
            "5 Set": "",
            "6 Set": "",
            "7 Set": ""
        },
        image: "src/imagens/bundles/acu.png"
    },
    {
        name: "Terrorist Set",
        price: 188.00,
        permanent: true,
        parts: 5,
        expBonus: null,
        stats: {
            "1 Set": "Rate of Fire +4%",
            "2 Set": "Bullet Speed +5%",
            "3 Set": "HP +3%",
            "4 Set": "Attack Power +3%",
            "5 Set": "Movement Speed +5%",
            "6 Set": "",
            "7 Set": ""
        },
        image: "src/imagens/bundles/terrorist.png"
    },
    {
        name: "Green Army Set",
        price: 188.00,
        permanent: true,
        parts: 0,
        stats: {
            "1 Set": "",
            "2 Set": "",
            "3 Set": "",
            "4 Set": "",
            "5 Set": "",
            "6 Set": "",
            "7 Set": ""
        },
        image: "src/imagens/bundles/green_army.png"
    },
    {
        name: "Ghost Hunter (White Set)",
        price: 188.00,
        permanent: true,
        parts: 7,
        expBonus: "+10%",
        stats: {
            "1 Set": "Hit Rate +3%",
            "2 Set": "Range +3%",
            "3 Set": "Rate of Fire +4%",
            "4 Set": "Bullet Speed +5%",
            "5 Set": "HP +3%",
            "6 Set": "Attack Power +3%",
            "7 Set": "Movement Speed +5%"
        },
        image: "src/imagens/bundles/ghost_hunter_white.png"
    },
    {
        name: "Ghost Hunter (Red Set)",
        price: 188.00,
        permanent: true,
        parts: 7,
        expBonus: "+10%",
        stats: {
            "1 Set": "Hit Rate +3%",
            "2 Set": "Range +4%",
            "3 Set": "Rate of Fire +4%",
            "4 Set": "Bullet Speed +5%",
            "5 Set": "HP +3%",
            "6 Set": "Attack Power +3%",
            "7 Set": "Movement Speed +5%"
        },
        image: "src/imagens/bundles/ghost_hunter_red.png"
    },
    {
        name: "Relaxed Bear Set",
        price: 188.00,
        permanent: true,
        parts: 0,
        stats: {
            "1 Set": "",
            "2 Set": "",
            "3 Set": "",
            "4 Set": "",
            "5 Set": "",
            "6 Set": "",
            "7 Set": ""
        },
        image: "src/imagens/bundles/relaxed_bear.png"
    },
    {
        name: "Rambo Set",
        price: 188.00,
        permanent: true,
        parts: 0,
        stats: {
            "1 Set": "",
            "2 Set": "",
            "3 Set": "",
            "4 Set": "",
            "5 Set": "",
            "6 Set": "",
            "7 Set": ""
        },
        image: "src/imagens/bundles/rambo.png"
    },
    {
        name: "Tears of the Sun Set",
        price: 188.00,
        permanent: true,
        parts: 7,
        expBonus: '+10%',
        stats: {
            "1 Set": "Hit Rate +3%",
            "2 Set": "Range +4%",
            "3 Set": "Rate of Fire +4%",
            "4 Set": "Bullet Speed +5%",
            "5 Set": "HP +3%",
            "6 Set": "Attack Power +3%",
            "7 Set": "Movement Speed +5%"
        },
        image: "src/imagens/bundles/tears_of_the_sun.png"
    },
    {
        name: "Spring Set Red & Black",
        price: 188.00,
        permanent: true,
        parts: 4,
        stats: {
            "1 Set": "Bullet Speed +2%",
            "2 Set": "HP +3%",
            "3 Set": "Attack Power +3%",
            "4 Set": "Movement Speed +2%",
            "5 Set": "",
            "6 Set": "",
            "7 Set": ""
        },
        image: "src/imagens/bundles/spring_red_black.png"
    },
    {
        name: "Pajamas Set",
        price: 188.00,
        permanent: true,
        parts: 4,
        expBonus: null,
        stats: {
            "1 Set": "Bullet Speed +5%",
            "2 Set": "HP +3%",
            "3 Set": "Attack Power +3%",
            "4 Set": "Movement Speed +5%",
            "5 Set": "",
            "6 Set": "",
            "7 Set": ""
        },
        image: "src/imagens/bundles/pajamas_set.png"
    },
    {
        name: "Bruce Lee Set",
        price: 188.00,
        permanent: true,
        parts: 0,
        stats: {
            "1 Set": "",
            "2 Set": "",
            "3 Set": "",
            "4 Set": "",
            "5 Set": "",
            "6 Set": "",
            "7 Set": ""
        },
        image: "src/imagens/bundles/bruce_lee.png"
    },
    {
        name: "Red Cross Combat Suit",
        price: 188.00,
        permanent: true,
        parts: 7,
        stats: {
            "1 Set": "Hit Rate +3%",
            "2 Set": "Range +2%",
            "3 Set": "Rate of Fire +2%",
            "4 Set": "Bullet Speed +3%",
            "5 Set": "HP +3%",
            "6 Set": "Attack Power +3%",
            "7 Set": "Movement Speed +3%"
        },
        image: "src/imagens/bundles/red_crusader.png"
    },
    {
        name: "Clown Set (new stats)",
        price: 198.00,
        permanent: true,
        parts: 0,
        stats: {
            "1 Set": "",
            "2 Set": "",
            "3 Set": "",
            "4 Set": "",
            "5 Set": "",
            "6 Set": "",
            "7 Set": ""
        },
        image: "src/imagens/bundles/clown.png"
    },
    {
        name: "Private Detective Set",
        price: 198.00,
        permanent: true,
        parts: 6,
        expBonus: null,
        stats: {
            "1 Set": "Range +4%",
            "2 Set": "Bullet Speed +5%",
            "3 Set": "Rate of Fire +4%",
            "4 Set": "HP +3%",
            "5 Set": "Attack Power +3%",
            "6 Set": "Movement Speed +5%",
            "7 Set": ""
        },
        image: "src/imagens/bundles/private_detective.png"
    },
    {
        name: "Elite High School Set",
        price: 256.00,
        permanent: true,
        parts: 5,
        expBonus: null,
        stats: {
            "1 Set": "Rate of Fire +4%",
            "2 Set": "Bullet Speed +5%",
            "3 Set": "HP +3%",
            "4 Set": "Attack Power +3%",
            "5 Set": "Movement Speed +5%",
            "6 Set": "",
            "7 Set": ""
        },
        image: "src/imagens/bundles/elite_high_school.png"
    },
    {
        name: "2013 Christmas Bundle",
        price: 288.00,
        permanent: true,
        parts: 5,
        expBonus: '+10%',
        stats: {
            "1 Set": "Rate of Fire +2%",
            "2 Set": "Bullet Speed +2%",
            "3 Set": "HP +3%",
            "4 Set": "Attack Power +3%",
            "5 Set": "Movement Speed +3%",
            "6 Set": "",
            "7 Set": ""
        },
        image: "src/imagens/bundles/old_christmas.png"
    },
];
