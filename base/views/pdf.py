# from io import BytesIO

# from django.http import HttpResponse
# from django.shortcuts import get_object_or_404, render
# from django.template.loader import get_template
# from xhtml2pdf import pisa
# from base.models import Order

# def render_to_pdf(template_src, context_dict={}):
#   template=get_template(template_src)
#   html=template.render(context_dict)
#   result=BytesIO()
#   pdf=pisa.pisaDocument(BytesIO(html.encode("ISO-8859-1")),result)
#   if not pdf.err:
#       return HttpResponse(result.getvalue(),content_type="application/pdf")
#   return None

# def admin_order_pdf(request, pk):
#   order = get_object_or_404(Order, _id=pk)

#   context={
#         'order':order,
#     }
#   pdf= render_to_pdf('order_invoice.html',context)
#   if pdf:
#     response=HttpResponse(pdf, content_type="application/pdf")
#     content=f"inline; filename=order{order._id}.pdf"
#     response['Content-Disposition']=content
#     return response
#   return HttpResponse("not found")


import os

from base.models import Order
from django.conf import settings
from django.contrib.staticfiles import finders
from django.http import HttpResponse
from django.shortcuts import get_object_or_404
from django.template.loader import get_template
from xhtml2pdf import pisa


def link_callback(uri, rel):
	"""Convert HTML URIs to absolute system paths so xhtml2pdf can access
	those resources."""
	result = finders.find(uri)
	if result:
		if not isinstance(result, (list, tuple)):
			result = [result]
		result = list(os.path.realpath(path) for path in result)
		path=result[0]
	else:
		sUrl = settings.STATIC_URL        # Typically /static/
		sRoot = settings.STATIC_ROOT      # Typically /home/userX/project_static/
		mUrl = settings.MEDIA_URL         # Typically /media/
		mRoot = settings.MEDIA_ROOT       # Typically /home/userX/project_static/media/
		if uri.startswith(mUrl):
			path = os.path.join(mRoot, uri.replace(mUrl, ""))
		elif uri.startswith(sUrl):
			path = os.path.join(sRoot, uri.replace(sUrl, ""))
		else:
			return uri
	# make sure that file exists
	if not os.path.isfile(path):
		raise Exception('media URI must start with %s or %s' % (sUrl, mUrl))
	return path



def admin_order_pdf(request, pk):
	template_path = 'order_invoice.html'
	order = get_object_or_404(Order, _id=pk)
	orderItems = order.orderitem_set.all()
	context = {'orderItems': orderItems}
	# print("==================>", order.orderitem_set.all())
	# Create a Django response object, and specify content_type as pdf
	response = HttpResponse(content_type='application/pdf')
	response['Content-Disposition'] = f"attachment; filename='order{order._id}.pdf'"
	# find the template and render it.
	template = get_template(template_path)
	html = template.render(context)
 	# create a pdf
	pisa_status = pisa.CreatePDF(
		 html, dest=response, link_callback=link_callback)
	# if error then show some funy view
	if pisa_status.err:
		 return HttpResponse('We had some errors <pre>' + html + '</pre>')
	return response
