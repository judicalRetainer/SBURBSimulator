///get rid of session having way too many fields. Everything a session is keeping track of for summaries.
class SessionStats {
    bool hasClubs = false;
    bool hasDiamonds = false;
    bool opossumVictory = false;
    bool hasBreakups = false; //sessions aren't in charge of denizens anymore, they are for players and set when they get in the medium
    bool badBreakDeath = false;
    bool jackGotWeapon = false;
    bool jackRampage = false;
    bool jackScheme = false;
    bool luckyGodTier = false;
    bool choseGodTier = false;
    bool plannedToExileJack = false;
    bool hasHearts = false;
    bool hasSpades = false;
    bool rocksFell = false;
    bool denizenBeat = false; //session no longer keeps track of guardians.
    bool rapBattle = false;
    bool crashedFromSessionBug = false; //gets corrupted if an unrecoverable error gets caught.
    bool crashedFromPlayerActions = false;
    bool sickFires = false;
    bool dreamBubbleAfterlife = false;
    bool heroicDeath = false;
    bool won = false;
    bool justDeath = false;
    bool mayorEnding = false;
    bool gnosisEnding = false;
    bool loveEnding = false;
    bool hateEnding = false;
    bool monoTheismEnding = false;
    bool waywardVagabondEnding = false;
    bool murdersHappened = false;
    bool queenRejectRing = false;
    bool goodLuckEvent = false;
    bool badLuckEvent = false;
    bool hasFreeWillEvents = false;
    bool hasTier1Events = false;
    bool hasTier2Events = false;
    bool hasTier3Events = false;
    bool hasTier4Events = false;
    bool ectoBiologyStarted = false;
    bool doomedTimeline = false;
    bool makeCombinedSession = false; //happens if sick frog and few living players
    bool scratched = false;
    bool scratchAvailable = false;
    bool godTier = false;
    bool grimDarkPlayers = false;
    bool questBed = false;
    bool sacrificialSlab = false;
    bool hadCombinedSession = false;
    bool yellowYard = false;
    bool crashedFromCustomShit = false;
}