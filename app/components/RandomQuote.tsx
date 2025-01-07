"use client";
const arrayThing = [
    'The years teach much which the days never know. - Ralph Waldo Emerson',
    'It has never been my object to record my dreams, just to realize them. - Man Ray',
    'Ceasing to do evil, Cultivating the good, Purifying the heart: This is the teaching of the Buddhas. - The Buddha',
    'Friendship is the source of the greatest pleasures, and without friends even the most agreeable pursuits become tedious. - Thomas Aquinas',
    'A friend to all is a friend to none. - Aristotle',
    'Flow with whatever is happening and let your mind be free. Stay centered by accepting whatever you are doing. This is the ultimate. - Zhuang Zhou',
    'We are either progressing or retrograding all the while. There is no such thing as remaining stationary in this life. - James Freeman Clarke',
    'The happiness of a man in this life does not consist in the absence but in the mastery of his passions. - Alfred Tennyson',
    'Happiness is when what you think, what you say, and what you do are in harmony. - Mahatma Gandhi',
    "Love is the flower you've got to let grow. - John Lennon",
    'The best and most beautiful things in the world cannot be seen, nor touched... but are felt in the heart. - Helen Keller',
    'We may encounter many defeats, but we must not be defeated. - Maya Angelou',
    'I do not believe in a fate that falls on men however they act; but I do believe in a fate that falls on them unless they act. - G. K. Chesterton',
    'Only through our connectedness to others can we really know and enhance the self. And only through working on the self can we begin to enhance our connectedness to others. - Harriet Lerner',
    'Ever tried. Ever failed. No matter. Try Again. Fail again. Fail better. - Samuel Beckett',
    'The simplest things are often the truest. - Richard Bach',
    "It's better to be a lion for a day than a sheep all your life. - Elizabeth Kenny",
    'The friendship that can cease has never been real. - Jerome',
    'The greatest remedy for anger is delay. - Seneca the Younger',
    'It is not so important to know everything as to appreciate what we learn. - Hannah More',
    'My religion consists of a humble admiration of the illimitable superior spirit who reveals himself in the slight details we are able to perceive with our frail and feeble mind. - Albert Einstein',
    'Wisdom often times consists of knowing what to do next. - Herbert Hoover',
    'Prejudice is a burden that confuses the past, threatens the future and renders the present inaccessible. - Maya Angelou',
    'Opportunity is missed by most because it is dressed in overalls and looks like work. - Thomas Edison',
    'Knowledge comes, but wisdom lingers. It may not be difficult to store up in the mind a vast quantity of facts within a comparatively short time, but the ability to form judgments requires the severe discipline of hard work and the tempering heat of experience and maturity. - Calvin Coolidge',
    "Half the lies they tell about me aren't true. - Yogi Berra",
    'True friends stab you in the front. - Oscar Wilde',
    'I am not bothered by the fact that I am unknown. I am bothered when I do not know others. - Confucius',
    'If you are going to achieve excellence in big things, you develop the habit in little matters. Excellence is not an exception; it is a prevailing attitude. - Colin Powell',
    'As a technology, the book is like a hammer. That is to say, it is perfect: a tool ideally suited to its task. Hammers can be tweaked and varied but will never go obsolete. Even when builders pound nails by the thousand with pneumatic nail guns, every household needs a hammer. - James Gleick',
    'They say that time changes things, but you actually have to change them yourself. - Andy Warhol',
    'I believe in one thing only, the power of human will. - Joseph Stalin',
    'A passion for politics stems usually from an insatiable need, either for power, or for friendship and adulation, or a combination of both. - Fawn M. Brodie',
    'The smallest act of kindness is worth more than the grandest intention. - Oscar Wilde',
    'It has long been an axiom of mine that the little things are infinitely the most important. - Arthur Conan Doyle',
    'Faith in oneself is the best and safest course. - Michelangelo',
    'Liberty, taking the word in its concrete sense, consists in the ability to choose. - Simone Weil',
    'The truest greatness lies in being kind, the truest wisdom in a happy mind. - Ella Wheeler Wilcox',
    "Never interrupt someone doing what you said couldn't be done. - Amelia Earhart",
    'Just as a mother would protect her only child with her life, even so let one cultivate a boundless love towards all beings. - The Buddha',
    'Those that know, do. Those that understand, teach. - Aristotle',
    'Does wisdom perhaps appear on the earth as a raven which is inspired by the smell of carrion? - Friedrich Nietzsche',
    'Your mind will answer most questions if you learn to relax and wait for the answer. - William Burroughs',
    'There are many ways of going forward, but only one way of standing still. - Franklin D. Roosevelt',
    'I know but one freedom and that is the freedom of the mind. - Antoine de Saint-Exupéry',
    "And when the world is created, it is created in such a way that those eternal objects of God's loving wisdom become actualities - interacting with one another, relating to God in the finite realm. - Rowan Williams",
    "Some people thrive on huge, dramatic change. Some people prefer the slow and steady route. Do what's right for you. - Julie Morgenstern",
    'Love demands infinitely less than friendship. - George Jean Nathan',
    'The more you care, the stronger you can be. - Jim Rohn',
    'Everything that irritates us about others can lead us to an understanding of ourselves. - Carl Jung',
    'Our virtues and our failings are inseparable, like force and matter. When they separate, man is no more. - Nikola Tesla',
  'To enjoy life, we must touch much of it lightly. - Voltaire',
  'A successful person is one who can lay a firm foundation with the bricks that others throw at him or her. - David Brinkley',
  'To give oneself earnestly to the duties due to men, and, while respecting spiritual beings, to keep aloof from them, may be called wisdom. - Confucius',
  'Be slow of tongue and quick of eye. - Miguel de Cervantes',
  'Meditate … do not delay, lest you later regret it. - The Buddha',
  'One of the most beautiful qualities of true friendship is to understand and to be understood. - Seneca the Younger',
  'The World is my country, all mankind are my brethren, and to do good is my religion. - Thomas Paine',
  'Before you put on a frown, make absolutely sure there are no smiles available. - James M. Beggs',
  'Reason and free inquiry are the only effectual agents against error. - Thomas Jefferson',
  'Technology… is a queer thing. It brings you great gifts with one hand, and it stabs you in the back with the other. - Carrie Snow',
  'You are important enough to ask and you are blessed enough to receive back. - Wayne Dyer',
  'Sooner or later, those who win are those who think they can. - Richard Bach',
  'The friend who can be silent with us in a moment of despair or confusion, who can stay with us in an hour of grief and bereavement, who can tolerate not knowing... not healing, not curing... that is a friend who cares. - Henri Nouwen',
  'We are all something, but none of us are everything. - Blaise Pascal',
  'We could never learn to be brave and patient if there were only joy in the world. - Helen Keller',
  "It isn't what happens to us that causes us to suffer; it's what we say to ourselves about what happens. - Pema Chödrön",
  "I don't look to jump over 7-foot bars; I look around for 1-foot bars that I can step over. - Warren Buffett",
  'There are two kinds of failures: those who thought and never did, and those who did and never thought. - Laurence J. Peter',
  'Self-trust is the first secret of success. - Ralph Waldo Emerson',
  'In friendship as well as love, ignorance very often contributes more to our happiness than knowledge. - François de La Rochefoucauld',
  "Don't be dismayed by good-byes. A farewell is necessary before you can meet again. And meeting again, after moments or lifetimes, is certain for those who are friends. - Richard Bach",
  'What lies behind us and what lies before us are small matters compared to what lies within us. - Oliver Wendell Holmes Jr.',
  'Radiate boundless love towards the entire world — above, below, and across — unhindered, without ill will, without enmity. - The Buddha',
  'Science gives us knowledge, but only philosophy can give us wisdom. - Will Durant',
  'Ever tried. Ever failed. No matter. Try Again. Fail again. Fail better. - Samuel Beckett',
  'Life is so constructed that an event does not, cannot, will not, match the expectation. - Charlotte Brontë',
  'Difficulties are things that show a person what they are. - Epictetus',
  "Ignorant men don't know what good they hold in their hands until they've flung it away. - Sophocles",
  'The pessimist complains about the wind; the optimist expects it to change; the realist adjusts the sails. - William Arthur Ward',
  'Action is the foundational key to all success. - Pablo Picasso',
  'All action results from thought, so it is thoughts that matter. - Sai Baba',
  'Error is discipline through which we advance. - William Ellery Channing',
  'Permanence, perseverance and persistence in spite of all obstacles, discouragements, and impossibilities: It is this, that in all things distinguishes the strong soul from the weak. - Thomas Carlyle',
  'We are what our thoughts have made us; so take care about what you think. Words are secondary. Thoughts live; they travel far. - Swami Vivekananda',
  'You learn to speak by speaking, to study by studying, to run by running, to work by working; in just the same way, you learn to love by loving. - Anatole France',
  'These days people seek knowledge, not wisdom. Knowledge is of the past; wisdom is of the future. - Vernon Cooper',
  'Being in humaneness is good. If we select other goodness and thus are far apart from humaneness, how can we be the wise? - Confucius',
  'If I were two-faced, would I be wearing this one? - Abraham Lincoln',
  'Never idealize others. They will never live up to your expectations. - Leo Buscaglia',
  'Intuition will tell the thinking mind where to look next. - Jonas Salk',
  'The supreme art of war is to subdue the enemy without fighting. - Sun Tzu',
  'A little more persistence, a little more effort, and what seemed hopeless failure may turn to glorious success. - Elbert Hubbard',
  'I am like a falling star who has finally found her place next to another in a lovely constellation, where we will sparkle in the heavens forever. - Amy Tan',
  'Knowing your own darkness is the best method for dealing with the darkness of other people. - Carl Jung',
  'TV and the Internet are good because they keep stupid people from spending too much time out in public. - Douglas Coupland',
  'Now this is not the end. It is not even the beginning of the end. But it is, perhaps, the end of the beginning. - Winston Churchill',
  'Three things in human life are important. The first is to be kind. The second is to be kind. The third is to be kind. - Henry James',
  'Think big thoughts but relish small pleasures. - H. Jackson Brown Jr.',
  'Friendship marks a life even more deeply than love. Love risks degenerating into obsession, friendship is never anything but sharing. - Elie Wiesel',
]
//const moreQuotes = []
//var allQuotes = []
//for(var i=0; i<moreQuotes.length; i++){
  //allQuotes.push(moreQuotes[i].content + ' - '+moreQuotes[i].author);
//}
//console.log(allQuotes)
export default function RandomQuote() {
    return (
      <>
        <h5 className="text-md font-bold text-gray-400 ">{arrayThing[Math.floor(Math.random() * arrayThing.length)]}</h5>
      </>
    );
  }