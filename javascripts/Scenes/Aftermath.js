function Aftermath(session){
	this.session = session;
	this.canRepeat = false;
	this.playerList = [];  //what players are already in the medium when i trigger?
	this.trigger = function(playerList){
		this.playerList = playerList;
		return true; //this should never be in the main array. call manually.
	}


	this.democracyBonus = function(){
		var ret = "";
		if(this.session.democracyStrength == 0){
			return ret;
		}
		if(this.session.democracyStrength > 10 && findLivingPlayers(this.session.players).length > 0 ){
			ret += "The adorable Warweary Villein has been duly elected Mayor by the assembeled consorts and Carpacians. "
			ret += " His acceptance speech consists of promising to be a really great mayor that everyone loves who is totally amazing and heroic and brave. "
			ret += " He organizes the consort and Carpacians' immigration to the new Universe. ";
		}else{
			if(this.session.findLivingPlayers(this.session.players).length > 0){
				ret += " The Warweary Villein feels the sting of defeat. Although he helped the Players win their session, the cost was too great.";
				ret += " There can be no democracy in a nation with only one citizen left alive. ";
				ret += " He becomes the Wayward Vagabond, and exiles himself to the remains of the Players old world, rather than follow them to the new one.";
			}else{
				ret += " The Warweary Villein feels the sting of defeat. He failed to help the Players.";
				ret += " He becomes the Wayward Vagabond, and exiles himself to the remains of the Players' old world. ";
			}
		}
		return ret;
	}

	this.mournDead = function(div){
		var dead = findDeadPlayers(this.session.players);
		var living = findLivingPlayers(this.session.players);
		if(dead.length == 0){
			return "";
		}
		var ret = "<br><br>";
		if(living.length > 0){
			ret += " Victory is not without it's price. " + dead.length + " players are dead, never to revive. There is time for mourning. <br>";
		}else{
			ret += " The consorts and Carpacians both Prospitian and Dersite alike mourn their fallen heroes. ";
		}

		for(var i = 0; i< dead.length; i++){
			var p = dead[i];
			ret += "<br><br> The " + p.htmlTitleBasic() + " died " + p.causeOfDeath + ". ";
			var friend = p.getWhoLikesMeBestFromList(living);
			var enemy = p.getWhoLikesMeLeastFromList(living);
			if(friend){
				ret += " They are mourned by the" + friend.htmlTitle() + ". ";
				div.append(ret);
				ret = "";
				this.drawMourning(div, p,friend);
				div.append(ret);
			}else if(enemy){
				ret += " The " +enemy.htmlTitle() + " feels awkward about not missing them at all. <br><br>";
				div.append(ret);
				ret = "";
			}
		}
		div.append(ret);

	}

	this.drawMourning = function(div, dead_player, friend){
		var divID = (div.attr("id")) + "_" + dead_player.chatHandle;
		var canvasHTML = "<br><canvas id='canvas" + divID+"' width='" +canvasWidth + "' height="+canvasHeight + "'>  </canvas>";
		div.append(canvasHTML);
		var canvasDiv = document.getElementById("canvas"+ divID);

		var pSpriteBuffer = getBufferCanvas(document.getElementById("sprite_template"));
		drawSprite(pSpriteBuffer,friend,1000)

		var dSpriteBuffer = getBufferCanvas(document.getElementById("sprite_template"));
		drawSprite(dSpriteBuffer,dead_player,1000)

		copyTmpCanvasToRealCanvasAtPos(canvasDiv, pSpriteBuffer,-100,0)
		copyTmpCanvasToRealCanvasAtPos(canvasDiv, dSpriteBuffer,100,0)
	}


	this.renderContent = function(div){
		var living = findLivingPlayers(this.session.players);
		var end = "<Br>";
		if(living.length == this.session.players.length){
			end += " All "
		}
		end += living.length + " players are alive.<BR>" ;
		if(living.length > 0){
			div.append(end);//write text, render mourning
			end = "<Br>";
			this.mournDead(div);
			var spacePlayer = findAspectPlayer(this.session.players, "Space");
			if(spacePlayer.landLevel >= 6){
				end += "<br> Luckily, the " + spacePlayer.htmlTitle() + " was diligent in frog breeding duties. ";
				if(spacePlayer.landLevel < 8){
					end += " The frog looks... a little sick or something, though... That probably won't matter. You're sure of it. ";
				}
				end += " The frog is deployed, and grows to massive proportions, and lets out a breath taking Vast Croak.  ";
				if(spacePlayer.landLevel < 8){
					end += " The door to the new universe is revealed.  As the leader reaches for it, a disaster strikes.   ";
					end += " Apparently the new universe's sickness manifested as its version of SBURB interfering with yours. ";
					end += " Your way into the new universe is barred, and you remain trapped in the medium.  <Br><br>Game Over.";
					end += " Or is it?"
					//I am hella tempted to implement mixed sessions here, like the troll/human session in canon.
					renderScratchButton();
				}else{
					end += this.democracyBonus();
					end += " <Br><br> The door to the new universe is revealed. Everyone files in. <Br><Br> Thanks for Playing. ";
				}
			}else{
				end += "<br>Unfortunately, the " + spacePlayer.htmlTitle() + " was unable to complete frog breeding duties. ";
				end += " They only got " + (spacePlayer.landLevel/10*100) + "% of the way through. ";
				end += " Who knew that such a pointless mini-game was actually crucial to the ending? ";
				end += " No universe frog, no new universe to live in. Thems the breaks. ";
				end += " If it's any consolation, it really does suck to fight so hard only to fail at the last minute. <Br><Br>Game Over.";
				end += " Or is it? "
				renderScratchButton();
			}
	}else{
		div.append(end);
		end = "<Br>";
		this.mournDead(div);
		end += this.democracyBonus();
		end += " <br>The players have failed. No new universe is created. Their home universe is left unfertilized. <Br><Br>Game Over. ";
	}
	var strongest = findStrongestPlayer(this.session.players)
	end += "<br> The MVP of the session was: " + strongest.htmlTitle() + " with a power of: " + strongest.power;
	end += "<br>Thanks for Playing!<br>"
	div.append(end);
	var divID = (div.attr("id")) + "_aftermath" ;

	var ch = canvasHeight;
	if(this.session.players.length > 6){
		ch = canvasHeight*1.5; //a little bigger than two rows, cause time clones
	}
	var canvasHTML = "<br><canvas id='canvas" + divID+"' width='" +canvasWidth + "' height="+ch + "'>  </canvas>";

	div.append(canvasHTML);
	var canvasDiv = document.getElementById("canvas"+ divID);
	poseAsATeam(canvasDiv, this.session.players, 2000); //everybody, even corpses, pose as a team.

	}

	this.content = function(div, i){
		var ret = " TODO: Figure out what a non 2.0 version of the Intro scene would look like. "
		div.append(ret);
	}
}
