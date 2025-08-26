import { Component, ElementRef, inject, OnInit, viewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { PoButtonModule, PoModalComponent, PoModalModule } from '@po-ui/ng-components';

@Component({
  selector: 'app-root',
  imports: [PoButtonModule, PoModalModule],
  templateUrl: './app.component.html',
  host: {
    '(window:message)': 'onMessage($event)'
  }
})
export class AppComponent implements OnInit {
  readonly parameters = viewChild.required('parameters', { read: PoModalComponent });
  readonly appSample = viewChild.required<ElementRef>('appSample');

  protected url!: SafeResourceUrl;
  protected canShowIframe = false;
  private readonly sanitizer = inject(DomSanitizer);

  ngOnInit(): void {
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl("http://localhost:4201");
  }

  onMessage(event: any): void {
    console.log('fachada',event.data)
    if (event.data.type === "getUrl") {
      this.appSample().nativeElement.contentWindow.postMessage({ type: 'setUrl', url: "https://www.github.com/" }, '*');
      window.parent.postMessage({ type: 'setUrl', url: "https://www.google.com/" }, '*');
    } else if (event.data.type === "onClose") {
      this.onClose();
    }
  }

  onClose(): void {
    this.canShowIframe = false;
    this.parameters().close();
  }

  onOpenModal(): void {
    this.canShowIframe = true;
    this.parameters().open();
  }
}
