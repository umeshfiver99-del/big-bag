import { CalendarDays, Check, CircleUserRound, CreditCard, MessageSquareText, MoreHorizontal } from "lucide-react";

export function ProductPreview() {
  return (
    <div className="product-preview" role="region" aria-label="Example generated client portal">
      <div className="preview-rail">
        <span className="preview-brand">N</span>
        <button aria-label="Overview" className="active"><CircleUserRound /></button>
        <button aria-label="Messages"><MessageSquareText /></button>
        <button aria-label="Calendar"><CalendarDays /></button>
        <button aria-label="Billing"><CreditCard /></button>
      </div>
      <div className="preview-body">
        <div className="preview-topbar">
          <div><small>Northstar studio</small><strong>Client portal</strong></div>
          <span>JP</span>
        </div>
        <div className="preview-welcome">
          <p>Good morning, Jordan</p>
          <h3>Your launch is moving.</h3>
          <div className="preview-progress"><i /><span>3 of 4 approvals complete</span></div>
        </div>
        <div className="preview-columns">
          <section>
            <header><strong>Latest work</strong><button aria-label="More options"><MoreHorizontal /></button></header>
            <div className="preview-art"><span>Brand system 1.4</span></div>
            <div className="preview-review"><span><Check /> Approved</span><time>Today, 10:42</time></div>
          </section>
          <aside>
            <strong>Next up</strong>
            <div><CalendarDays /><span><b>Homepage review</b><small>Thursday · 2:30 PM</small></span></div>
            <div><CreditCard /><span><b>Final invoice</b><small>$2,400 · Due Sep 24</small></span></div>
          </aside>
        </div>
      </div>
    </div>
  );
}
