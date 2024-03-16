<template>
    <div class="invoice-box">
			<header>
				<h1>Order Summary - ملخص الطلب</h1>
				<address contenteditable>
					<p>{{ item.registeredName }}</p>
					<p>{{ item.registeredAddress }}</p>
					<p>{{ item.registeredEmail }}</p>
					<p class="ltr-dir">(966) {{ item.registeredPhone }}</p>
					<p>الحساب: {{ item.taxAccount }}</p>
					<p>الرقم الضريبى: {{ item.taxNumber }}</p>
					<p>السجل التجارى: {{ item.commercialRegister }}</p>
				</address>
				<span><img class="logo" alt="" src="@/assets/ajzal/logo.svg"></span>
				
			</header>
			<article>

				<table class="meta">
					<tr>
						<th><span contenteditable>Invoice #-رقم الفاتورة</span></th>
						<td><span contenteditable>{{ item.id }}</span></td>
					</tr>
					<tr>
						<th><span contenteditable>Invoice date-تاريخ اصدار الفاتورة </span></th>
						<td><span contenteditable>{{  $moment(item.createdAt).tz($moment.tz.guess()).format('YYYY-MM-DD HH:mm') }}</span></td>
					</tr>
					<tr>
						<th><span contenteditable>Amount Due-اجمالى الفاتورة</span></th>
						<td><span id="prefix" contenteditable>ر٫س</span><span> {{ item.totalPrice }}</span></td>
					</tr>
				</table>
				<div class="float-left ">
          <h1 class="text"><span class="ltr">{{ item.userName }}</span>{{ ' - ' + $t('Recipient') }}</h1>
					<br>
					<br>
				<address contenteditable>
					<p>{{ item.companyName }}</p>
				</address>
			</div>
				<table class="inventory">
					<thead>
						<tr>
              <th><span contenteditable>Total-الاجمالى</span></th>
              <th><span contenteditable>Price-السعر</span></th>
              <th><span contenteditable>Quantity-الكمية</span></th>
              <th><span contenteditable>Unit-الوحدة</span></th>
							<th><span contenteditable>Item-اسم الصنف</span></th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="orderItem in orderItems" :key="orderItem.id">
							<td><span contenteditable> {{ orderItem.product.name }}</span></td>
							<td><span contenteditable>Piece-حبة</span></td>
							<td><span contenteditable>{{ orderItem.quantity }}</span></td>
							<td><span data-prefix>ر.س</span><span contenteditable> {{ orderItem.unitPrice }}</span></td>
							<td><span data-prefix>ر.س</span><span> {{ roundToTwo(orderItem.quantity * orderItem.unitPrice) }}</span></td>
						</tr>
					</tbody>
				</table>
				<table class="balance">

				</table>
				<table class="balance-2">

					<tr>
						<th><p contenteditable>الاجمالى غير شامل الضريبة</p><p contenteditable class="ltr-dir">Total (Excluding VAT)</p></th>
						<td><span data-prefix>ر٫س</span><span> {{ roundToTwo(item.totalPrice - item.vat) }}</span></td>
					</tr>
					<tr>
						<th><span contenteditable>مجموع الخصومات Discount</span></th>
						<td><span data-prefix>ر٫س</span><span> {{ roundToTwo(item.discount??0) }}</span></td>
					</tr>
					<tr>
						<th><span contenteditable>مجموع ضريبة القيمة المضافة <br>Total VAT</span></th>
						<td><span data-prefix>ر٫س</span><span> {{ roundToTwo(item.vat) }}</span></td>
					</tr>
					<tr>
						<th>
							<p contenteditable>اجمالي المبلغ المستحق </p>
							<p contenteditable class="ltr-dir">Total Amount Due</p>
						</th>
						<td><span data-appendex>ر٫س</span><span> {{ roundToTwo(item.totalPrice - item.paidAmount) }}</span></td>
					</tr>
					<tr>
						<th>
							<p contenteditable>الأجمالي</p>
							<p contenteditable class="ltr-dir">Total</p>
							</th>
						<td><span data-prefix>ر٫س</span><span> {{ roundToTwo(item.totalPrice) }}</span></td>
					</tr>
				</table>
			</article>
			<aside>
				<h3><span contenteditable>ملاحظات اضافية</span></h3>
				<div contenteditable>
					<p>{{ item.notes }}</p>
				</div>
			</aside>
    </div>
</template>
<script>
export default {
	props: ['item', 'orderItems'],
  mounted() {
    console.log(this.item, this.orderItems)
  },
	methods: {
		// round to nearest 2 decimals
		roundToTwo(num) {
			return +(Math.round(num + "e+2") + "e-2");
		},
	}
}
</script>
<style scoped>
/* reset */
.invoice-box{
    padding: 10px 30px;

}

*
{
    direction: ltr;
	border: 0;
	box-sizing: content-box;
	color: inherit;
	font-family: inherit;
	font-size: inherit;
	font-style: inherit;
	font-weight: inherit;
	line-height: inherit;
	list-style: none;
	/* margin: 0;
	padding: 0; */
	text-decoration: none;
	vertical-align: top;
}

/* content editable */
.ltr-dir{
	direction: ltr;
}
*[contenteditable] { border-radius: 0.25em; min-width: 1em; outline: 0; }

*[contenteditable] { cursor: pointer; }

*[contenteditable]:hover, *[contenteditable]:focus, td:hover *[contenteditable], td:focus *[contenteditable], img.hover { background: #DEF; box-shadow: 0 0 1em 0.5em #DEF; }

span[contenteditable] { display: inline-block; }

/* heading */

h1 { font: bold 100% sans-serif; letter-spacing: 0em; text-align: center; text-transform: uppercase; }

/* table */

.text {

}
.ltr{
  unicode-bidi: embed; direction: ltr;
}

table { font-size: 68%; table-layout: fixed; width: 100%; }
table { border-collapse: separate; border-spacing: 2px; }
th, td { border-width: 1px; padding: 0.5em; position: relative; text-align: center; }
th, td { border-radius: 0.25em; border-style: solid; }
th { background: #EEE; border-color: #BBB; }
td { border-color: #DDD; }

/* page */

html { font: 16px/1 'Open Sans', sans-serif; overflow: auto; padding: 0.5in; }
html { background: #999; cursor: default; }

body { box-sizing: border-box; height: 11in; margin: 0 auto; overflow: hidden; padding: 0.5in; width: 8.5in; }
body { background: #FFF; border-radius: 1px; box-shadow: 0 0 1in -0.25in rgba(0, 0, 0, 0.5); }

/* header */

header { margin: 0 0 2em; }
header:after { clear: both; content: ""; display: table; }

header h1 { background: #000; border-radius: 0.25em; color: #FFF; margin: 0 0 1em; padding: 0.5em 0; }
header address { float: left; font-size: 68%; font-style: normal; line-height: 1.25; margin:  1em 0 0 1em ; }
header address p { margin: 0 0 0.1em; }
header span, header img { display: block; float: right; }
header span { margin: 0 0 1em 1em; max-height: 25%; max-width: 60%; position: relative; }
header img { max-height: 100%; max-width: 100%; }
header input { cursor: pointer; -ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)"; height: 100%; left: 0; opacity: 0; position: absolute; top: 0; width: 100%; }

/* article */
article, article address, table.meta, table.inventory { margin: 0 0 1em; }
article:after { clear: both; content: ""; display: table; }
article h1 { clip: rect(0 0 0 0); position: absolute; }

article address { float: right; font-size: 100%; font-weight: bold; }

/* table meta & balance */

table.meta { text-align: right; direction: rtl; float: right; width: 35%; }
.float-left {float: left}
table.balance { text-align: right; direction: rtl; float: left; width: 40%; }
table.balance-2 { text-align: right; direction: rtl;  float: right; width: 40%; }
table.meta:after, table.balance:afterو table.balance-2:after { clear: both; content: ""; display: table; }

/* table meta */

table.meta th { width: 40%; }
table.meta td { width: 60%; }

/* table items */

table.inventory { clear: both; width: 100%; }
table.inventory th { font-weight: bold; text-align: center; }

table.inventory td:nth-child(1) { width: 26%; }
table.inventory td:nth-child(2) { width: 38%; }
table.inventory td:nth-child(3) { text-align: center; width: 12%; }
table.inventory td:nth-child(4) { text-align: center; width: 12%; }
table.inventory td:nth-child(5) { text-align: center; width: 12%; }

/* table balance */
table.balance th{ width: 70%; }
table.balance td { width: 30%; }
table.balance td { text-align: center; }
table.balance-2 th{ width: 70%; }
table.balance-2 td { width: 30%; }
table.balance-2 td, table.balance-2 { text-align: center; }

/* aside */

aside h3 { border: none; border-width: 0 0 1px; margin: 0 0 1em; }
aside h3 { border-color: #999; border-bottom-style: solid; }

/* javascript */

.add, .cut
{
	border-width: 1px;
	display: block;
	font-size: .6rem;
	padding: 0.25em 0.5em;
	float: right;
	text-align: center;
	width: 0.6em;
}

.add, .cut
{
	background: #9AF;
	box-shadow: 0 1px 2px rgba(0,0,0,0.2);
	background-image: -moz-linear-gradient(#00ADEE 5%, #0078A5 100%);
	background-image: -webkit-linear-gradient(#00ADEE 5%, #0078A5 100%);
	border-radius: 0.5em;
	border-color: #0076A3;
	color: #FFF;
	cursor: pointer;
	font-weight: bold;
	text-shadow: 0 -1px 2px rgba(0,0,0,0.333);
}

.add { margin: -2.5em 0 0; }

.add:hover { background: #00ADEE; }

.cut { opacity: 0; position: absolute; top: 0; left: -1.5em; }
.cut { -webkit-transition: opacity 100ms ease-in; }

tr:hover .cut { opacity: 1; }

@media print {
	* { -webkit-print-color-adjust: exact; }
	html { background: none; padding: 0; }
	body { box-shadow: none; margin: 0; }
	span:empty { display: none; }
	.add, .cut { display: none; }
}

@page { margin: 0; }
</style>
