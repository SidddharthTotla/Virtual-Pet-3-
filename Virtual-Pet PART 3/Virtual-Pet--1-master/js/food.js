class food{
    constructor(){
        this.foodStock= 0;
         this.lastFed = null;
        this.image = loadImage('images/Milk.png');
    }
   
    display(){
        var x = 80,y=100;

        imageMode(CENTER);
        image(this.image,720,220,70,70);

        if(this.foodStock!==0){
            for(var i = 0;i<this.foodStock;i++){
                if(i%10===0){
                    x=80;
                    y=y+50;
                }
                image(this.image,x,y,50,50);
                x=x+30;
            }
        }
    }
    getFoodStock(){
        database.ref('Food').on("value",function (data){
            this.foodStock = data.val();
            //this.foodStock
        })
        console.log(this.foodStock);
    }
    updateFoodStock(fs){
       // console.log(fs);
        database.ref('/').update({
            Food:fs
        })
    }
    deductFood(){}
    bedroom(){
        background(bR,550,500);
    }
    livingRoom(){
        background(lR,550,500);
    }
    washroom(){
        background(wR,550,500);
    }
}