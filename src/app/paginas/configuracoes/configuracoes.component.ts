import { Component, OnInit, Renderer, ElementRef, ViewChild } from '@angular/core';
import { ABUNIDADADEMEDIDAService } from "app/servicos/ab-unidade-medida.service";
import { ABDICLINHAService } from "app/servicos/ab-dic-linha.service";
import { AB_DIC_LINHA } from "app/entidades/AB_DIC_LINHA";
import { AB_DIC_UNIDADE_MEDIDA } from "app/entidades/AB_DIC_UNIDADE_MEDIDA";

@Component({
  selector: 'app-configuracoes',
  templateUrl: './configuracoes.component.html',
  styleUrls: ['./configuracoes.component.css']
})
export class ConfiguracoesComponent implements OnInit {

  node0010 = true;
  node0011 = true;
  node000 = true;
  constructor(private elementRef: ElementRef, private renderer: Renderer) { }

  ngOnInit() {
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "assets/js/demo.js";
    this.elementRef.nativeElement.appendChild(s);

  }


}