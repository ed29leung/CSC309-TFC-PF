from django.core.management.base import BaseCommand
from classes.models import Class
from studios.models import Studio
from classes.models import Class, ClassTimeTable, Keywords, EnrollClass

from accounts.models import Account

import random

class Command(BaseCommand):
	help = 'Populate the database with some data, assuming studio data is already in the database.'
	class_per_studio = 5
	time_per_class = 5

	def init():
		

	def handle(self, *args, **kwargs):
		# For each studio, create some classes
		for studio in Studio.objects.all():
			for i in random.randint(self.class_per_studio):
				Class.objects.create(
					studio=studio,
					name=CLASS_NAMES[random.randint(len(CLASS_NAMES))],
					description=""