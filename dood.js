document.addEventListener('DOMContentLoaded',()=>{
    const grid=document.querySelector('.grid')
    const doodler=document.createElement('div')
    let doodlerleftspace=50
    let startPoint = 150
    let doodlerbottomspace=startPoint
    let isGameover=false
    let platformCount=5
    let platforms=[]
    let upTimerId
    let downTimerId
    let isJumping = true
    let isGoingLeft = false
    let isGoingRight = false
    let leftTimerId
    let rightTimerId
    let score = 0

    function createDoodler(){
        grid.appendChild(doodler)
        doodler.classList.add('doodler')
        doodlerleftspace=platforms[0].left
        doodler.style.left=doodlerleftspace + 'px'
        doodler.style.bottom=doodlerbottomspace + 'px'
    }
    
    class Platform{
           constructor(newplatbottom){
                   this.bottom=newplatbottom
                   this.left=Math.random() * 315
                   this.visual=document.createElement('div')

                   const visual=this.visual
                   visual.classList.add('platform')
                   visual.style.left=this.left + 'px'
                   visual.style.bottom=this.bottom + 'px'
                   grid.appendChild(visual)
           }
    }
    function createPlatforms(){
           for(let i=0;i< platformCount;i++){
                let platgap=600/platformCount
                let newplatbottom=100 + i *  platgap
                var newplatform=new Platform(newplatbottom)
                platforms.push(newplatform)
           }
    }
    function movePlatforms(){
           if(doodlerbottomspace > 200){
                   platforms.forEach(platform =>{
                     platform.bottom -= 4
                     let visual = platform.visual
                     visual.style.bottom=platform.bottom + 'px'

                     if(platform.bottom < 10){
                         let firstPlatform = platforms[0].visual
                         firstPlatform.classList.remove('platform')
                         platforms.shift()
                         score++
                         let newPlatform = new Platform(600)
                platforms.push(newPlatform)
                     }

                   })
           }
    }

      function jump(){
           clearInterval(downTimerId)
           isJumping = true
           upTimerId = setInterval(function (){
                      doodlerbottomspace += 20
                      doodler.style.bottom = doodlerbottomspace + 'px'
                      if(doodlerbottomspace > startPoint + 200)
                      {
                            fall()
                      }
           },30)
      }    

      function fall(){
              clearInterval(upTimerId)
              isJumping = false
              downTimerId = setInterval(function(){
                         doodlerbottomspace -= 5
                         doodler.style.bottom = doodlerbottomspace + 'px'
                         if(doodlerbottomspace <= 0){
                                  gameOver()
                         }

                         platforms.forEach(platform =>{
                                if(
                                        (doodlerbottomspace >= platform.bottom)
                                        &&(doodlerbottomspace <= platform.bottom + 15)
                                        &&((doodlerleftspace + 60) >= platform.left)
                                        &&(doodlerleftspace <= platform.left + 85)
                                        && !isJumping
                                        ){
                                                console.log('landed')
                                                startPoint = doodlerbottomspace
                                                jump()
                                        }
                               
                                
                         })
              },30)

      }
      function gameOver(){
             console.log('game over')
             isGameover = true
             while(grid.firstChild){
                 grid.removeChild(grid.firstChild)
             }
             grid.innerHTML = score
             clearInterval(upTimerId)
             clearInterval(downTimerId)
             clearInterval(leftTimerId)
             clearInterval(rightTimerId)
      }

      function control(e){
              if(e.key === "ArrowLeft"){
                  //move left
                  moveLeft()
              }
              else if(e.key === "ArrowRight"){
                  //move right
                  moveRight()
              }
              else if(e.key === "ArrowUp"){
                  //move straight
                  moveStraight()
              }
           
      }

       function moveLeft(){
             if(!isGoingRight){
                  clearInterval(rightTimerId)
                  isGoingRight = false
             }
             isGoingLeft = true
             leftTimerId = setInterval(() => {

                if(doodlerleftspace >= 0){
                   doodlerleftspace -= 5
                   doodler.style.left = doodlerleftspace + 'px'}
                   else{
                        moveRight()
                   }
             }, 30);
       }

        function moveRight(){
                 if(!isGoingLeft){
                        clearInterval(leftTimerId)
                        isGoingLeft = false
                 }
                 isGoingRight = true
                 rightTimerId = setInterval(function (){
                        if(doodlerleftspace <= 340){
                                doodlerleftspace += 5
                                doodler.style.left = doodlerleftspace + 'px'
                        }
                        else{
                                moveLeft()
                        }
                 },30)
        }

     function moveStraight(){
           isGoingLeft = false
           isGoingRight = false
           clearInterval(rightTimerId)
           clearInterval(leftTimerId)
     }

    function start(){
          if(!isGameover){

                createPlatforms()
               createDoodler()
               
               movePlatforms()
               setInterval(movePlatforms,30)
               jump()
               document.addEventListener('keyup',control)
          }
    }
    //attach to button
    start()
})