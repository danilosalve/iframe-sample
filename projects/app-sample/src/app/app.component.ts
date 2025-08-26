import { Component, inject, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { PoButtonModule, PoLoadingModule } from '@po-ui/ng-components';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [PoButtonModule, PoLoadingModule],
  host: {
    '(window:message)': 'onMessage($event)'
  }
})
export class AppComponent implements OnInit {
  protected url!: SafeResourceUrl;
  private readonly sanitizer = inject(DomSanitizer);

  ngOnInit(): void {
    console.log("iniciando app");
    //window.parent.postMessage({ type: 'getUrl' }, '*');
  }

  //@HostListener('window:message', ['$event'])
  onMessage(event: any): void {
    console.log('app', event);
    if (event.data.type === "setUrl") {
      this.url = this.sanitizer.bypassSecurityTrustResourceUrl(event.data.url);
    }
  }

  onClose(): void {
    window.parent.postMessage({ type: 'onClose' }, '*');
    console.info("Encerrando aplicativo");
  }

  onGetUrl(): void {
    window.parent.postMessage({ type: 'getUrl' }, '*');
    console.info("Solicitando URL");
  }
}
