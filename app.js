(()=>{"use strict";var e,t={410:(e,t,s)=>{var i=s(260),a=s.n(i);class r extends a().Scene{constructor(e,t){super(e),this.config=t,this.screenCenter=[t.width/2,t.height/2],this.fontSize=34,this.lineHeight=42,this.fontOptions={fontSize:`${this.fontSize}px`,fill:"#fff"}}create(){this.add.image(-300,0,"sky").setOrigin(0)}createMenu(e,t){let s=0;e.forEach((e=>{const i=[this.screenCenter[0],this.screenCenter[1]+s];e.textGO=this.add.text(...i,e.text,this.fontOptions).setOrigin(.5,1),s+=this.lineHeight,t(e)}))}}const o=r;const h=class extends o{constructor(e){super("GameScene",e),this.player=null,this.platforms=null,this.platformHorizontalDistance=[175,225],this.platformVerticalDistanceRange=[150,200],this.platformHorizontalDistanceRange=[100,150],this.jumpVelocity=600,this.score=0,this.scoreText="",this.scoreToIncrease=0,this.platformVelocity=150,this.doubleJump=!0}preload(){this.load.image("sky","assets/Sky.png"),this.load.spritesheet("player","assets/Idle.png",{frameWidth:32,frameHeight:32,startFrame:0,endFrame:10}),this.load.spritesheet("run","assets/Run.png",{frameWidth:32,frameHeight:32,startFrame:0,endFrame:21}),this.load.image("Platform","assets/Platform.png"),this.load.image("Wall","assets/Walls.png")}create(){super.create(),this.createAnimation(),this.createPlayer(),this.createPlatforms(),this.createFloor(),this.createWalls(),this.createColliders(),this.createScore(),this.handleInputs(),this.createPause()}update(){this.checkGameStatus(),this.recyclePlatforms(),this.move(),this.updateSpeed(),this.listenToEvents()}createBG(){this.add.image(-400,0,"sky").setOrigin(0)}createScore(){this.score=0;const e=localStorage.getItem("bestScore");this.scoreText=this.add.text(.02*this.config.width,.02*this.config.height,"Score: 0",{fontSize:"32px",fill:"#000"}),this.add.text(.02*this.config.width,.07*this.config.height,`Best score : ${e||0}`,{fontSize:"18px",fill:"#000"})}createAnimation(){this.anims.create({key:"idle",frames:this.anims.generateFrameNumbers("player",{start:0,end:10}),frameRate:20,repeat:-1}),this.anims.create({key:"run",frames:this.anims.generateFrameNumbers("run",{start:12,end:21}),frameRate:10,repeat:-1})}createPlayer(){this.player=this.physics.add.sprite(this.config.startPosition.x,this.config.startPosition.y,"player",0).setOrigin(0),this.player.body.gravity.y=1300,this.player.setScale(1.5),this.player.setCollideWorldBounds(!0),this.player.anims.play("idle",!0);const e=.6*this.player.width,t=.9*this.player.height,s=(this.player.width-e)/2;this.player.body.setSize(e,t,s,0)}createWalls(){this.LWall=this.physics.add.sprite(-32,0,"Wall").setOrigin(0,0).setImmovable(),this.RWall=this.physics.add.sprite(this.config.width-32,0,"Wall").setOrigin(0,0).setImmovable(),this.physics.add.collider(this.player,this.LWall),this.physics.add.collider(this.player,this.RWall)}createFloor(){this.floor=this.physics.add.sprite(0,this.config.height-16,"Platform").setImmovable(!0).setOrigin(0,0).setScale(2),this.physics.add.collider(this.player,this.floor)}updateSpeed(){10==this.scoreToIncrease&&(this.platformVelocity+=10,this.platforms.setVelocityY(this.platformVelocity),this.scoreToIncrease=0)}createPlatforms(){this.platforms=this.physics.add.group();for(let e=0;e<6;e++){const e=this.platforms.create(0,0,"Platform").setImmovable(!0).setOrigin(0,0),t=this.platforms.create(0,0,"Platform").setImmovable(!0).setOrigin(-1,0);this.placePlatform(e,t)}this.platforms.setVelocityY(this.platformVelocity)}createColliders(){this.physics.add.collider(this.player,this.platforms)}handleInputs(){this.leftKeyDown=!1,this.rightKeyDown=!1,this.downKeyDown=!1,this.input.keyboard.on("keydown_W",(()=>{this.jumpKeyDown=!0}),this),this.input.keyboard.on("keydown_A",(()=>{this.leftKeyDown=!0}),this),this.input.keyboard.on("keydown_D",(()=>{this.rightKeyDown=!0}),this),this.input.keyboard.on("keydown_S",(()=>{this.downKeyDown=!0}),this),this.input.keyboard.on("keyup_A",(()=>{this.leftKeyDown=!1}),this),this.input.keyboard.on("keyup_D",(()=>{this.rightKeyDown=!1}),this),this.input.keyboard.on("keyup_S",(()=>{this.downKeyDown=!1}),this)}move(){this.leftKeyDown&&this.Left(),this.rightKeyDown&&this.Right(),this.downKeyDown&&this.Drop(),!this.rightKeyDown&!this.leftKeyDown&!this.downKeyDown&&this.Stop(),this.player.body.touching.down&&(this.player.body.gravity.y=1300),this.jumpKeyDown&&(this.Jump(),this.jumpKeyDown=!1)}checkGameStatus(){(this.player.getBounds().bottom>=this.config.height||this.player.y<=0)&&this.gameOver()}placePlatform(e,t){const s=this.getUpMostPlatform(),i=Phaser.Math.Between(-450,-100),a=Phaser.Math.Between(...this.platformVerticalDistanceRange),r=Phaser.Math.Between(...this.platformHorizontalDistanceRange);e.x=i,e.y=s-a,t.x=e.x+r,t.y=e.y}recyclePlatforms(){const e=[];this.platforms.getChildren().forEach((t=>{t.y>=this.config.height&&(e.push(t),2===e.length&&(this.placePlatform(...e),this.increaseScore(),this.scoreToIncrease++))}))}getUpMostPlatform(){let e=0;return this.platforms.getChildren().forEach((function(t){e=Math.min(t.y,e)})),e}gameOver(){this.physics.pause(),this.player.setTint(15616036),this.saveBestScore(),this.time.addEvent({delay:1e3,callback:()=>{this.physics.pause(),this.scene.pause(),this.scene.start("EndScreen",{score:this.score})},loop:!1})}saveBestScore(){const e=localStorage.getItem("bestScore"),t=e&&parseInt(e,10);(!t||this.score>t)&&localStorage.setItem("bestScore",this.score)}Jump(){this.floor.destroy(),this.player.body.touching.down?(this.player.setVelocityY(-this.jumpVelocity),this.doubleJump=!0):1==this.doubleJump&&(this.player.setVelocityY(-this.jumpVelocity),this.doubleJump=!1)}Left(){this.player.setFlipX(!0),this.player.setVelocityX(-250),this.player.anims.play("run",!0)}Right(){this.player.setFlipX(!1),this.player.setVelocityX(250),this.player.anims.play("run",!0)}Stop(){this.player.setVelocityX(0),this.player.gravity,this.player.anims.play("idle",!0)}Drop(){this.player.body.gravity.y=5e3,this.player.anims.play("idle",!0)}increaseScore(){this.score++,this.scoreText.setText(`Score: ${this.score}`)}createPause(){this.add.image(.9*this.config.width,.1*this.config.height,"pause").setInteractive().setScale(3).setOrigin(1).on("pointerdown",(()=>{this.physics.pause(),this.scene.pause(),this.scene.launch("PauseScene")}))}listenToEvents(){this.events.on("resume",(()=>{this.physics.resume()}))}};const n=class extends o{constructor(e){super("EndScreen",{...e,canGoBack:!1}),this.menu=[{scene:"GameScene",text:"Restart"}]}init(e){this.score=e.score}create(){super.create(),this.createMenu(this.menu,this.setupMenuEvents.bind(this));const e=localStorage.getItem("bestScore");this.add.text(this.config.width/2,0,`Best Score: ${e||0}`,this.fontOptions).setOrigin(.5,0),this.add.text(this.config.width/2,42,`Score: ${this.score}`,this.fontOptions).setOrigin(.5,0)}setupMenuEvents(e){const t=e.textGO;t.setInteractive(),t.on("pointerover",(()=>{t.setStyle({fill:"#ff0"})})),t.on("pointerout",(()=>{t.setStyle({fill:"#fff"})})),t.on("pointerup",(()=>{this.scene.start("GameScene")}))}};class l extends a().Scene{constructor(){super("PreloadScene")}preload(){this.load.image("sky","assets/Sky.jpg"),this.load.image("pause","assets/pause.png")}create(){this.scene.start("GameScene")}}const c=l;const p=class extends o{constructor(e){super("PauseScene",e),this.menu=[{scene:"GameScene",text:"Continue"},{scene:"MenuScene",text:"Exit"}]}create(){super.create(),this.createMenu(this.menu,this.setupMenuEvents.bind(this))}setupMenuEvents(e){const t=e.textGO;t.setInteractive(),t.on("pointerover",(()=>{t.setStyle({fill:"#ff0"})})),t.on("pointerout",(()=>{t.setStyle({fill:"#fff"})})),t.on("pointerup",(()=>{e.scene&&"Continue"===e.text?(this.scene.stop(),this.scene.resume(e.scene)):(this.scene.stop("PlayScene"),this.scene.start(e.scene))}))}},y={width:500,height:700,startPosition:{x:250,y:630}},d=[c,h,n,p],m=e=>new e(y),u={type:a().AUTO,...y,physics:{default:"arcade",arcade:{debug:!1}},scene:d.map(m)};new(a().Game)(u)}},s={};function i(e){var a=s[e];if(void 0!==a)return a.exports;var r=s[e]={exports:{}};return t[e](r,r.exports,i),r.exports}i.m=t,e=[],i.O=(t,s,a,r)=>{if(!s){var o=1/0;for(c=0;c<e.length;c++){for(var[s,a,r]=e[c],h=!0,n=0;n<s.length;n++)(!1&r||o>=r)&&Object.keys(i.O).every((e=>i.O[e](s[n])))?s.splice(n--,1):(h=!1,r<o&&(o=r));if(h){e.splice(c--,1);var l=a();void 0!==l&&(t=l)}}return t}r=r||0;for(var c=e.length;c>0&&e[c-1][2]>r;c--)e[c]=e[c-1];e[c]=[s,a,r]},i.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return i.d(t,{a:t}),t},i.d=(e,t)=>{for(var s in t)i.o(t,s)&&!i.o(e,s)&&Object.defineProperty(e,s,{enumerable:!0,get:t[s]})},i.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={143:0};i.O.j=t=>0===e[t];var t=(t,s)=>{var a,r,[o,h,n]=s,l=0;if(o.some((t=>0!==e[t]))){for(a in h)i.o(h,a)&&(i.m[a]=h[a]);if(n)var c=n(i)}for(t&&t(s);l<o.length;l++)r=o[l],i.o(e,r)&&e[r]&&e[r][0](),e[r]=0;return i.O(c)},s=self.webpackChunkaltudemypackage=self.webpackChunkaltudemypackage||[];s.forEach(t.bind(null,0)),s.push=t.bind(null,s.push.bind(s))})();var a=i.O(void 0,[736],(()=>i(410)));a=i.O(a)})();