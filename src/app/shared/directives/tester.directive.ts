import { Directive, Input, TemplateRef, ViewContainerRef } from "@angular/core";

@Directive({
    selector:"[testDirective]"
})
export class TestDirective{
    
   @Input() set testDirective(value:string){
     if(value == "mama"){
        this.viewCRef.createEmbeddedView(this.tempRef)
     }else{
        this.viewCRef.clear()
     }
   }
   constructor(private tempRef:TemplateRef<any>, private viewCRef:ViewContainerRef){
   
   }


}