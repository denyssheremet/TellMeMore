
var metaModelSentences = {
    "Level 1": {
        "Unspecified Noun": {
            questions: [
                "People/Men/Women/Bankers/They/... are evil -> Who specifically is evil?",
                "Schools don't work -> Which schools specificallly?",
                "I have learned a lot -> What have you learned specifically?",
            ],
            examples:
                `
    I want a change
    It's terrible 
    I have lots of skills
    Meet you at the pub
    I want a computer
    I want the report tomorrow 
    I'm signing you up for a course
    I need it now 
    We need this done today
    Talk to customers 
    I need a new car
    Get the problem fixed 
    I read it in a magazine
    They don't rate me
    People are stupid
    They should know better 
    It needs to be done properly
    People make mistakes
    Those people need to be disciplined
    Those products are expensive 
    One knows what's best
    This happens everyday 
    If you learn this you will become very rich
    We shouldn't do that 
    It's either them or us
    We're all going to be made redundant
    Americans can express themselves 
    If you can't beat them (at golf)....
    People eat food
    Dutch people are better than Germans at cooking according to me
    We like to party
    I like food
`},
        "Simple Deletion": {
            questions: [
                "I paint -> What do you paint?",
                "We've talked -> Talked about what?",
                "They stole -> Stole what? From whom?",
            ],
            examples:
                `
    I'm unhappy
    You can't Help me
    I'm fed up 
    I'm sad
    We can manage 
    I just can't start
    He is wrong 
    I know 
    I feel
    I feel curious 
    I don't want to
    Never again 
    He can't
    You must not do that 
    Stop it
`},
        "Comparative Deletion": {
            questions: [
                "I'm the best -> Best at what? Compared to whom?",
                "Cats are better than dogs -> Better at what / better in what way?",
                "He is more intelligent -> More intelligent than who? How have you measured intelligence?",
            ],
            examples:
                `
    Our new product is more effective
    It's for the greater good 
    He's more sensitive
    Soccer is better 
    She goes further
    This is far more efficient 
    You look happier
    Hard beds are better 
    He's more tolerant
    She's much brighter 
    This is more complicated
    This is more like it 
    Green is calmer
    She's more fun 
    This is getting much easier
    Blue is better 
    I'm enjoying this so much more
`},
    },
    "Level 2": {
        "Unspecified Verb": {
            questions: [
                "We need to grow -> What do you mean by grow?",
                "We are improving communication -> How are you improving it?",
                "We need to change this -> Change in what way?",
            ],
            examples:
                `
    She rejected me
    I'm enjoying this
    I calmed the customer down 
    My boss ruined me
    I've taken the heat out of the situation 
    I did a great piece of work
    I've seen the writing on the wall 
    They get on really well
    He's running the department badly 
    I like him
    This company is going places 
    She has failed
    I told him, now he should do it properly 
    I'm running on empty
    At least he tries 
    Let's go!
`},
        "Nominalization": {
            questions: [
                "This is a disruption -> disrupt ->  What does it disrupt?.",
                "There was a discussion -> discuss -> What did you discuss? With whom?",
                "We had a meeting -> meet -> Who did you meet? What did you talk about?",
            ],
            examples:
                `
    I want recognition
    We have made our decision 
    Your work needs more attention
    I have a bad feeling 
    I want more choice
    There's no relationship 
    We had a great meeting
    Failure worries me 
    I want publicity
    Our customers have no patience 
    Sales doesn't work
    He makes a bad impression 
    Marketing doesn't work
    We need better management 
    Manufacturing has no future
    I want more direction 
    Decisions are hard
`},
        "Universal Quantifiers": {
            questions: [
                "All cats are evil -> All cats? Has there ever been a cat that wasn't evil?",
                "Nobody can understand this -> Nobody? Not even one person? Not even you?",
                "Everybody does/feels ... -> Is there anybody that doesn't do/feel ...?",
            ],
            examples:
                `
He never listens to me
Nobody likes me 
He always tells the truth
All companies are greedy 
No one cares any more
It's always the honest people that love 
Nobody is having any fun these days
Nothings the same anymore 
All the competition exaggerates
Nothing works here 
I'll never be able to get fit
Everybody's talking about it 
They always have an excuse
Everybody works too hard
Sales people can never be trusted
Doctors are always healthy
`},
    },
    "Level 3": {
        "Complex Equivalence": {
            questions: [
                "Her yelling means that she doesn't care about me -> How does her yelling mean that she doesn't care about you?",
                "He is late, so he must be smart -> How does him being late mean that he is smart?",
                "You cooked spaghetti, so you must be Italian -> How does cooking spaghetti mean that one is Italian?",
            ],
            examples:
                `
He's silent, that means he ...
A good relationship means never having to say sorry
To stay in this job I have to work harder
You can't have a well paid job that is enjoyable too
If you want success you have to give up your home life
That means trouble
He came in late on Saturday; I'm going to have to fire him
When you talk like that you are going to get fired
He wears the same colour shirt as the boss: that means he's in for promotion
I saw them down the pub together; they must be having an affair
He doesn't know what I want so he doesn't care about me
She goes down to the gym so she must be healthy
`},
        "Lost Comparative": {
            questions: [
                "This is important -> According to whom?",
                "This is the best opportunity of your lifetime -> According to whom?",
                "Bankers are evil -> According to whom?",
            ],
            examples:
                `
it's disaster to be made redundant
People make mistakes
Managers are overpaid
You can't trust salespeople
Marketing is an easy job
They should have seen it coming 
People like people who are like them
They're always doing that 
People learn from people who are different
This report needs finishing 
Learning algebra will make you more successful
A meeting was held 
This needs fixing
Mistakes have been made 
This report needs finishing
Nobody is pulling their weight 
A meeting has already been held about this
People are more flexible these days 
They've been at it again
`},
        "Mind Reading": {
            questions: [
                "I know you are going to like this -> How do you know that?",
                "You are sad -> How do you know?",
                "He hates me -> How do you know?",
            ],
            examples:
                `
you don't rate me
I know you don't believe me 
She's really happy now
He doesn't want to help me 
He'll laugh at this
You just don't care 
They will think I'm stupid
He's ever so happy 
He'll be upset if you disturb him
My boss thinks I'm lazy 
He'll get upset if you leave early
He'll hate you if you do that 
When I present, everyone is judging me
The boss is in a foul mood today 
You can see how effective MS Paint is
You know this isn't working 
I know you're enjoying this
I know what you mean
`},
        "Cause and Effect": {
            questions: [
                "You make me angry -> How exactly do I make you angry? Are you sure that is the cause?",
                "That makes me sad -> How exactly does that make you sad? Are you sure that is the cause?",
                "Painting makes you more creative -> How exactly does painting make you more creative?",
            ],
            examples:
                `
He makes me cringe just by speaking
Because of you I feel worthless
This exercise will inspire me
I'm unhappy when he goes away
If I stay in this job I have to work harder
If you want a pay raise you have to stay late
If I do that I'll get into trouble
My boss makes me angry
If you do that I'll have to leave
I feel tense as soon as speaks
They restrict my enthusiasm
I can't relax without music
If you want success you have to give up your home life
We can't do that because he won't listen
If I do the presentation it will go badly
There's no point trying, he won't listen
I won't apply, they'll never give me the job
Things always go wrong when she walks in here
`},
    },
    "Level 4": {
        "Modal Operator of Necessity": {
            questions: [
                "",
                "",
                "",
            ],
            examples:
                `
    I have to take care of her by feeding her grapes
    You and I shouldn't play tennis now
    You have to educate yourself well about how language works
    You must arrive on time for tomorrow's meeting about plant intelligence
    You've got to laugh when you watch this video
    I must buy a new Tesla Model X from you right now
    You have to dress yourself in a tuxedo for event X tonight
    You must be polite to boss Eric by giving him a pat on the back now
    I have to drive this train until 20:00
    You must brush your teeth today
    I mustn't leave this appartment yet
    You need to make a strategy about how you are going to get to your home from here now
    You have to sit on the chair next to Harry now 
    You ought to care more about whether Liverpool wins the Champions League Final this season
    You shouldn't talk to Harry about his dog today
    This project must not fail to plant a tree in our garden before midnight
    You mustn't read this sentence right now
`},
        "Modal Operator of Possibility": {
            questions: [
                "",
                "",
                "",
            ],
            examples:
                `
    I can't tell you the truth about what my given name is
    I can't go to your place now 
    I can't relax my right leg
    I can't call Eric now 
    I'll never be to able to learn how to tie my shoes
    I won't be able to complete project X before the deadline tomorrow
    I can't sleep now
    I can't apply for job X
    I couldn't possibly tell you what my real name is now
    I might not finish report X before 15:00 today 
    Today, I couldn't ask Jennie to raise my pay 5%
    I can't imagine that you showered with cold water today
    I can't concentrate on working on my job at the moment
    Tomorrow, I might just tell him that I stole his Apple watch
    I couldn't fire her from her current position
    I could eat an apple if I tried 
    I might do what he says I should do at 19:00
`},
        "Presupposition": {
            questions: [
                "",
                "",
                "",
            ],
            examples:
                `
What are we going to do next?
When this plan falls I'll say 'told you so'
It will be easier when he leaves
What will the next reorganization bring?
When are you leaving?
Who are you going to fire next?
You'll enjoy it once you do it
Once you make a start you'll find it easy
We can't buy a car because we don't have any cash
I'll be so happy when he gets found out
I can't go for lunch with you because I'm going to a customer meeting
I can't learn to use this properly because I don't have enough time
What's going to go wrong next?
I'm just waiting for a bus
I'll be happy when this is all over
`},
    }
}