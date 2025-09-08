import db from "#db/client";
import { createUser } from "#db/queries/users";
import { createLevel } from "#db/queries/levels";
import { createUserQuest } from "#db/queries/users_quests";
import { createQuest } from "#db/queries/quests";
import { createBadge } from "#db/queries/badges";

await db.connect();
async function seed() {
  await createUser("seedUser1", "seedPassword1", 0, 0);
  await seedBadges
  await seedQuests
  await seedUsersQuests
}

function seedDatabase() {
  async function seedBadges() {
    await createBadge("astronaut", "badge_1.png");
    await createBadge("record", "badge_2.png");
    await createBadge("soreal", "badge_3.png");
    await createBadge("concert", "badge_4.png");
    await createBadge("museum", "badge_5.png");
    await createBadge("skyscraper", "badge_6.png");
    await createBadge("new-york", "badge_7.png");
    await createBadge("rat", "badge_8.png");
    await createBadge("walking", "badge_9.png");
    await createBadge("canal", "badge_10.png");
    await createBadge("hot-dog", "badge_11.png");
    await createBadge("run", "badge_12.png");
  }
  seedBadges();

  const messagesHoustonQuest1 = [
    "Rumors of this Flying Saucer",
    "Its out of this world",
    "Lets go find it!",
    "Do you accept the quest?",
  ];
  const messagesHoustonQuest2 = [
    "Heard of this music style,",
    "its creating a new genre",
    "called, Chopped N Screwed",
    "Do you accept the quest?",
  ];
  const messagesHoustonQuest3 = [
    "Talk of the town is,",
    "this new dance crew",
    "Go and check them out",
    "Do you accept the quest?",
  ];
  const messagesSantaAnaQuest1 = [
    "Escape into the past",
    "Rediscover our past and immerse yourself",
    "Lets get to it!",
    "Do you accept the quest?",
  ];
  const messagesSantaAnaQuest2 = [
    "Have fun at the old towne",
    "Invite friends and have a fun night out",
    "Have fun and be responsible!",
    "Do you accept the quest?",
  ];
  const messagesSantaAnaQuest3 = [
    "Go see your favorite band or artist",
    "Enjoy the show with friends and drinks",
    "Jam out to your favorite songs!",
    "Do you accept the quest?",
  ];
  const messagesNycQuest1 = [
    "NYC has five boroughs!",
    "Each borough here offers something unique.",
    "Your quest, should you accept, is to visit each one and bring back a souvenir.",
    "When you're done, upload a photo of your five different souvenirs.",
    "What do you say? Will you brave the boroughs?",
  ];
  const messagesNycQuest2 = [
    "Have fun at the old town",
    "Invite friends and have a fun night out",
    "Have fun and be responsible!",
    "Do you accept the quest?",
  ];
  const messagesNycQuest3 = [
    "Go see your favorite band or artist",
    "Enjoy the show with friends and drinks",
    "Jam out to your favorite songs!",
    "Do you accept the quest?",
  ];
  const messagesCumberlandQuest1 = [
    "Don't fall in the water!",
    "Enjoy a leisure walk.",
    "Check out the museum.",
    "Do you accept the quest?",
  ];
  const messagesCumberlandQuest2 = [
    "Go enjoy some of Curtis' Famous Weiners!",
    "Open since 1918 selling hotdogs.",
    "Definitely worth checking out.",
    "Do you accept the quest?",
  ];
  const messagesCumberlandQuest3 = [
    "Do you like a challenge?",
    "Get your friends together to try and escape.",
    "Make sure to think outside the box!",
    "Do you accept the quest?",
  ];

    //     createQuest(title, messages, points, location, badge_id)
  async function seedQuests() {
    //HOUSTON QUESTS
    await createQuest("Flying Saucer Hunt", messagesHoustonQuest1, 1, "Houston", 1);
    await createQuest("Chopped & Screwed", messagesHoustonQuest2, 1, "Houston", 2);
    await createQuest("Soreal Dance Studio", messagesHoustonQuest3, 1, "Houston", 3);
    //SANTA ANA QUESTS
    await createQuest("Museum Escape", messagesSantaAnaQuest1, 1, "Santa Ana", 4);
    await createQuest("Downtown Fun", messagesSantaAnaQuest2, 1, "Santa Ana", 5);
    await createQuest("Concert Fun", messagesSantaAnaQuest3, 1, "Santa Ana", 6);
    //NYC QUESTS
    await createQuest("Borough Hopper", messagesNycQuest1, 1, "NYC", 7);
    await createQuest("Pizza Rat", messagesNycQuest2, 1, "NYC", 8);
    await createQuest("I'm Walkin' Here", messagesNycQuest3, 1, "NYC", 9);
    //CUMBERLAND QUESTS
    await createQuest("C&O Adventure", messagesCumberlandQuest1, 1, "Cumberland", 10);
    await createQuest("Hot Dog", messagesCumberlandQuest2, 1, "Cumberland", 11);
    await createQuest("", messagesCumberlandQuest3, 1, "Cumberland", 12);
  }
    seedQuests();


  //    createUserQuest(userId, questId)
  async function seedUsersQuests() {
    await createUserQuest(1, 1); //user 1, quest 1 = "Flying Saucer Hunt"
    await createUserQuest(1, 2); //user 1, quest 2 = "Chopped & Screwed"
    await createUserQuest(1, 3); //user 1, quest 3 = "Soreal Dance Studio"
    await createUserQuest(1, 4);
    await createUserQuest(1, 5); 
    await createUserQuest(1, 6);
    await createUserQuest(1, 7);
    await createUserQuest(1, 8); 
    await createUserQuest(1, 9);
    await createUserQuest(1, 10);
    await createUserQuest(1, 11); 
    await createUserQuest(1, 12);
  }
  seedUsersQuests();
}
seedDatabase();
await seed();
await seedDatabase();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  await createUser("seedUser1", "seedPassword1", 0, 0);
}

async function seedDatabase() {
  async function seedBadges() {
    await createBadge("astronaut", "badge_1.png");
    await createBadge("record", "badge_2.png");
    await createBadge("soreal", "badge_3.png");
    await createBadge("concert", "badge_4.png");
    await createBadge("museum", "badge_5.png");
    await createBadge("skyscraper", "badge_6.png");
    await createBadge("new-york", "badge_7.png");
    await createBadge("rat", "badge_8.png");
    await createBadge("walking", "badge_9.png");
    await createBadge("canal", "badge_10.png");
    await createBadge("hot-dog", "badge_11.png");
    await createBadge("run", "badge_12.png");
  }
  await seedBadges();

  const messagesHoustonQuest1 = [
    "Rumors of this Flying Saucer",
    "Its out of this world",
    "Lets go find it!",
    "Do you accept the quest?",
  ];
  const messagesHoustonQuest2 = [
    "Heard of this music style,",
    "its creating a new genre",
    "called, Chopped N Screwed",
    "Do you accept the quest?",
  ];
  const messagesHoustonQuest3 = [
    "Talk of the town is,",
    "this new dance crew",
    "Go and check them out",
    "Do you accept the quest?",
  ];
  const messagesSantaAnaQuest1 = [
    "Escape into the past",
    "Rediscover our past and immerse yourself",
    "Lets get to it!",
    "Do you accept the quest?",
  ];
  const messagesSantaAnaQuest2 = [
    "Have fun at the old towne",
    "Invite friends and have a fun night out",
    "Have fun and be responsible!",
    "Do you accept the quest?",
  ];
  const messagesSantaAnaQuest3 = [
    "Go see your favorite band or artist",
    "Enjoy the show with friends and drinks",
    "Jam out to your favorite songs!",
    "Do you accept the quest?",
  ];
  const messagesNycQuest1 = [
    "NYC has five boroughs!",
    "Each borough here offers something unique.",
    "Your quest, should you accept, is to visit each one and bring back a souvenir.",
    "When you're done, upload a photo of your five different souvenirs.",
    "What do you say? Will you brave the boroughs?",
  ];
  const messagesNycQuest2 = [
    "Lurking in the shadows, a lone rat dashes between garbage cans, pizza slice in its mouth.",
    "Can you spot NYC's most famous celebrity, Pizza Rat?",
    "Snap a pic to earn this exclusive badge! Do you accept?",
  ];
  const messagesNycQuest3 = [
    "The hustle and bustle of NYC is infamous!",
    "The grind never stops, and the city never sleeps!",
    "Locals know, you're not really here unless you've invoked the magic words...",
    "I'm walkin' here!",
    "Snap a pic of either you or someone saying these magic words and you'll earn this badge.",
  ];
  const messagesCumberlandQuest1 = [
    "Don't fall in the water!",
    "Enjoy a leisure walk.",
    "Check out the museum.",
    "Do you accept the quest?",
  ];
  const messagesCumberlandQuest2 = [
    "Go enjoy some of Curtis' Famous Weiners!",
    "Open since 1918 selling hotdogs.",
    "Definitely worth checking out.",
    "Do you accept the quest?",
  ];
  const messagesCumberlandQuest3 = [
    "Do you like a challenge?",
    "Get your friends together to try and escape.",
    "Make sure to think outside the box!",
    "Do you accept the quest?",
  ];

  //     createQuest(title, messages, points, location, badge_id)
  async function seedQuests() {
    //HOUSTON QUESTS
    await createQuest(
      "Flying Saucer Hunt",
      messagesHoustonQuest1,
      1,
      "Houston",
      1
    );
    await createQuest(
      "Chopped & Screwed",
      messagesHoustonQuest2,
      1,
      "Houston",
      2
    );
    await createQuest(
      "Soreal Dance Studio",
      messagesHoustonQuest3,
      1,
      "Houston",
      3
    );
    //SANTA ANA QUESTS
    await createQuest(
      "Museum Escape",
      messagesSantaAnaQuest1,
      1,
      "Santa Ana",
      4
    );
    await createQuest(
      "Downtown Fun",
      messagesSantaAnaQuest2,
      1,
      "Santa Ana",
      5
    );
    await createQuest("Concert Fun", messagesSantaAnaQuest3, 1, "Santa Ana", 6);
    //NYC QUESTS
    await createQuest("Borough Hopper", messagesNycQuest1, 1, "NYC", 7);
    await createQuest("Pizza Rat", messagesNycQuest2, 1, "NYC", 8);
    await createQuest("I'm Walkin' Here", messagesNycQuest3, 1, "NYC", 9);
    //CUMBERLAND QUESTS
    await createQuest(
      "C&O Adventure",
      messagesCumberlandQuest1,
      1,
      "Cumberland",
      10
    );
    await createQuest("Hot Dog", messagesCumberlandQuest2, 1, "Cumberland", 11);
    await createQuest("Escape", messagesCumberlandQuest3, 1, "Cumberland", 12);
  }
  await seedQuests();

  //    createUserQuest(userId, questId, complete, quest_image_url)
  async function seedUsersQuests() {
  await createUserQuest(1, 1, false, null); //user 1, quest 1 = "Flying Saucer Hunt"
  await createUserQuest(1, 2, false, null); //user 1, quest 2 = "Chopped & Screwed"
  await createUserQuest(1, 3, false, null); //user 1, quest 3 = "Soreal Dance Studio"
  await createUserQuest(1, 4, false, null);
  await createUserQuest(1, 5, false, null);
  await createUserQuest(1, 6, false, null);
  await createUserQuest(1, 7, false, null);
  await createUserQuest(1, 8, false, null);
  await createUserQuest(1, 9, false, null);
  await createUserQuest(1, 10, false, null);
  await createUserQuest(1, 11, false, null);
  await createUserQuest(1, 12, false, null);
  }
  await seedUsersQuests();
  
  // createLevel(name, min_xp, max_xp)
  async function seedLevels() {
    await createLevel("Novice", 0, 0);
    await createLevel("Wanderer", 1, 2);
    await createLevel("Nomad", 3, 5);
    await createLevel("Explorer", 6, 8);
    await createLevel("Adventurer", 9, 11);
    await createLevel("Legend of the Map", 12, 999999)
  }
  await seedLevels()
}
