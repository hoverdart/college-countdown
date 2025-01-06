var arrayThing = [
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
    'Everything that irritates us about others can lead us to an understanding of ourselves. - Carl Jung'
]

export default function RandomQuote() {
    var random = arrayThing[Math.floor(Math.random() * arrayThing.length)]
    return (
      <>
        <h5 className="text-md font-bold text-gray-400 ">{random}</h5>
      </>
    );
  }