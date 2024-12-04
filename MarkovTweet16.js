const Markov = require('js-markov');

module.exports = {
    MarkovExp : function () {
        // Create a new Markov Chain
        // By default, its type is text
        var markov = new Markov();

        // Quality Daily Express 'Headlines'
        markov.addStates([
            "SCORCHER‼ Spanish Air to hit Britain in TWO DAYS making us hotter than IBIZA!",
            "Asylum seekers eat ROADKILL in filthy Calais camp!",
            "'This is unfair‼' - Ruth Langsford likes tweet after being FIRED from This Morning about turtles!",
            "Kim Kardashian bares ALL in skimpy bikini on California beach!",
            "Jeremy CORBYN supports TERRORIST organisation Antifa who BLEW UP building!",
            "'Colder than MOSCOW' - freezing air to PLUNGE Britain into cold wave that will last until APRIL!",
            "Diana WAS the people's PRINCESS!",
            "FROZEN Britain ATTACKED by FOREIGN Arctic air, PLUNGING Britain into CHAOS!",
            "23 INCHES OF SNOW AT CHRISTMAS!",
            "1,000,000 illegal IMMIGRANTS coming to our shores NEXT WEEK!",
            "Sturgeon in danger? SHOCKING poll shows BoJo GAINING popularity in Scotland!",
            "New book shows AMAZING truth behind Meghan Markle - she HATES Britain!",
            "EU fishermen STEAL our BRITISH Pfizer vaccines!",
            "Crisis point- Drakeford in DANGER as popularity PLUNGES in Wales while BoJo SOARS!",
            "EU lockdown HELL: Brussels faces wave of new CLOSURES - as UK prepares for FREEDOM!",
            "Scotland lockdown: Sturgeon's DISAPPOINTING routemap out of Covid branded: Nothing!",
            "'It's called SOVEREIGNITY‼‼' MEP CELEBRATES as Viktor Orban IGNORES EU laws - unity CRUSHED!",
            "Stacey Solomon explains where her MISSING cat is after fans quiz 'GUTTED' Loose Women star!",
            "HMRC SCAM: Britons warned about a PHONE CALL which threatens arrest 'do not fall for it‼'!",
            "Really‼‼? Nicola Sturgeon ACCUSED of WALKING OUT on BoJo call for TV briefing!",
            "When can we fly to SPAIN?!",
            "When can I HUG my grandchildren?!",
            "Spexit NOW‼ EU on alert as Spanish eurosceptics LAUNCH campaign to LEAVE Brussels bloc!",
            "Biden SHAMED: US President called OUT on Twitter over phone calls!",
            "TERRIFYING video shows how SPEAKING can spread Covid!",
            "Hancock CLAIMS Britain's Covid vaccine roll-out will have a 'QUIET WEEK' because of supply!",
            "No Global Warming Here‼ Were woolly MAMMOTHS driven to EXTINCTION because it was TOO COLD?!",
            "Democrats seek to CAPITALIZE on Texas storm DEVASTATION!",
            "Take that, BRUSSELS‼ Hancock publishes DATA to show VACCINE rollout is WORKING!",
            "'It's a CON‼'- Britons react WITH fury after Biden puts BRAKES on UK-US DEAL!",
            "'Your days are NUMBERED, Nicola‼'- Widdicombe predicts Brexit SUCCESS will destroy Sturgeon!",
            "'Close EVERY door, for GOOD‼'- Meghan and Harry should NEVER be allowed to re-enter ROYAL family - Express poll!",
            "Life after death EXISTS‼ Man who had near-DEATH experience SPEAKS OUT!",
            "Baking soda NEWS: Research paper from Good Housekeeping REVEALS 5 things you should NEVER clean with baking soda!",
            "All thanks to OUR BREXIT‼ Macron SHAMED over SLOW vaccine rollout while Britain STORMS ahead!",
            "'You're on TRIAL here‼'- Sturgeon reminded of HER PLACE in TENSE hearing slapdown!",
            "'What about the rest of us?‼'- Blackford sparks OUTRAGE online for ONLY asking question about Scotland after budget 'HELL is breaking LOOSE'!",
            "She's rope-a-doping us all - Sturgeon looks like DEATH warmed up as she faces challenge to her SUPREMACY!",
            "Britain to PAY for great WALL of Calais!",
            "£50 face cream that even advert WATCHDOG says WILL banish wrinkles!",
            "The World's Greatest Newspaper!",
            "World's MOST SUCCESSFUL newspaper crusade ends in GLORIOUS VICTORY for YOUR Daily Express!",
            "Girl eats 4000 washing up sponges!",
            "Livestreamed OXO CUBE gets more views than SOCIALIST Guardian broadcast!",
            "What WILL Sarah Vine and Andrew Pierce say about Jason Donovan at 55 and HIS black nail varnish?!"
//            "",
        ]);

        // Train the Markov Chain
        markov.train(4);

        // Generate an output
        tweet = "ExpressBot: " + markov.generateRandom(200);

        console.log(tweet)
        return tweet
    }
}