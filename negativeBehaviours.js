var negativeBehaviours = `
Swearing
Picking Your Nose
Smoking Cigarettes
Biting Fingernails
Drinking too much coffee
Hair picking
Watching Reality Television
Eating Fast Food
Consuming Alcohol 
Emotional Shopping
Spending On Credit Cards
Facebook
Twitter
Reddit
Eating Candy
Eating White Sugar
Eating Chocolate
Drinking Soda/Pop
Obsessively Checking iPhone/iPad
Eating Meat
Video Games
Cracking Your Knuckles
Speaking With Your Mouth Full
Talking To Yourself
Using Slang
Eating Dairy
Eating Gluten
Picking Your Teeth In Public
Forgetting To Shave
Going To The Club
Using Your Maiden Name
Humming To Yourself
Excessive Salt
All Work And No Play
Chewing Gum
Smoking eCigarettes
Biting Your Pen
Nibbling While Cooking
Overspending
Overeating
Snacking
Hair Picking
Skin Picking
Not Holding Eye Contact
Interrupting Someone
Sleeping-in
Skipping The Gym
Smoking
Saying “Ummm” And “Ahhh”
Porn Watching
Staying Up Late
Sleeping With Makeup
Lying
Overmedicating
Playing Kingdom Rush
Eating Too Fast / Not Chewing
Skipping Breakfast
Not Protecting Yourself From The Sun
Not Moisturizing
Not Flossing
Not Brushing Your Teeth
Using Your Phone In Bed
Negative Self Talk / Self Criticism
Saying “Yes” To Everything
Day Dreaming
Procrastinating
Using Devices At Night
Spending Too Much Time Online
Breaking Promises To Yourself
Rambling
Checking Your Hair / Eyebrows / Makeup / Nails
Watching T.V Right After Work
Repeating Yourself
Forgetting What You've Told Someone
Forgetting Names Of People You Meet
Giving Away “Tells” In Poker
Falling Asleep In Class
Slouching At The Computer
Slouching While Walking
Masturbating
Eating Past 8 P.M
Letting Fear Stop You From Trying Something New
Telling Secrets
Talking In Class
Gaming In Class
Online Surfing In Class
Losing Focus
Sitting Too Close To The T.V
Eating Cookies Every Damn Day
Arranging Instead of Cleaning
Picking Fights
Being Unfriendly
Leaving Your Wallet / Keys In Random Places
Skipping Class
Skipping Work
Not Doing Your Homework
Drinking Energy Drinks
Pinching Pennies
Spitting
Horking
Licking Your Lips
Drinking From The Carton
Leaving The Fridge Open
Leaving The Heat On When You Go Out
Skipping Meals
YouTube
Not Showering
Yelling At Your BF/GF
Talking About Your Sister Behind Her Back
Picking Scabs
Popping Zits
Losing Your Temper
Complaining
Annoying People On Purpose
Being Overly Critical
Being Argumentative
Putting Dishes In Sink And Not Washing Them
Quora
Biting Your Lips
Scratching An Itch
Being An Attention Hog 
Opening Countless Tabs
Buzz-friggin'-feed
Trolling Comments
Watching Seinfeld Reruns
Binge Watching Netflix
Emotional Eating
Fiddling With Your Hair
Poor Hygiene
Fiddling With Keys
Cheek Biting
Chewing On Your Hair
Shoplifting
m&m's
Hair Pulling
Scratching / Itching
Biting Your Disgusting Toe Nails
Eating When You Are Bored
Hoarding
Being A Know-It-All
Bragging
Chewing Tobacco
Chewing With Mouth Open
Being Late
Eavesdropping
Exaggerating
Excessive Throat Clearing
Fidgeting
Flaking Out
Freeloading
Gambling
Grinding Your Teeth
Kissing & Telling
Littering (really, stop littering)
Monopolizing A Conversation
Name Dropping
One-Upping
Pencil Chewing
Popping Gum
Speeding
Talking During Movies
Tapping Fingers/Pens/Etc.
Thumb Sucking
Whining
Borrowing And Not Returning Items
Belching
Loitering
Bullying People
Copying
Gossiping
Finishing People's Sentences
Leaving The Toilet Seat Up
Licking Your Fingers
`

var basicNeeds = ["Certainty", "Uncertainty/Variation", "Significance", "Love/Connection", "Growth", "Contribution"];

var logicalLevels = ["Environment", "Behaviour", "Skills", "Beliefs / Conviction", "Identity / Role", "Mission"]

// turn string of negative behaviours into an array
negativeBehaviours = negativeBehaviours.split("\n").slice(1, -1);
for (let i = 0; i < negativeBehaviours.length; i++) {
    negativeBehaviours[i] = negativeBehaviours[i].trim();
}