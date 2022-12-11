from django.core.management.base import BaseCommand
from classes.models import Class
from studios.models import Studio, Amenities, StudioImage
from classes.models import Class, ClassTimeTable, Keywords, EnrollClass
from subscriptions.models import SubscriptionPlan, CurrentSubscription

from django.core.files.images import ImageFile

from accounts.models import Account

import random, json, datetime, os

CLASS_PATH = 'PB/csc309-tfc-pb/startup/management/commands/data/class.json'
NAME_PATH = 'PB/csc309-tfc-pb/startup/management/commands/data/name.json'
KEYWORD_PATH = 'PB/csc309-tfc-pb/startup/management/commands/data/keyword.json'
AMENITY_PATH = 'PB/csc309-tfc-pb/startup/management/commands/data/amenity.json'
PIC_DIR = 'PB/csc309-tfc-pb/startup/management/commands/data/pics/'


class Command(BaseCommand):
	help = 'Populate the database with some data, assuming studio data is already in the database.'
	max_class_per_studio = 20
	max_time_per_class = 10
	max_keywords_per_class = 2
	max_spot_per_class = 20
	max_amenity_per_studio = 10
	max_amenity_quantity = 10
	max_image_per_studio = 3

	def init(self):
		with open(CLASS_PATH) as f:
			self.classes = json.load(f)
		print('Loaded {} classes'.format(len(self.classes)))
		self.classes = [(name, data) for name, data in self.classes.items()]

		with open(NAME_PATH) as f:
			self.names = json.load(f)
		print('Loaded {} names'.format(len(self.names)))

		with open(KEYWORD_PATH) as f:
			self.keywords = json.load(f)
		print('Loaded {} keywords'.format(len(self.keywords)))

		with open(AMENITY_PATH) as f:
			self.amenities = json.load(f)
		print('Loaded {} amenities'.format(len(self.amenities)))

		# read the files in the directory
		self.pics = os.listdir(PIC_DIR)
		print('Loaded {} images'.format(len(self.pics)))



	def handle(self, *args, **kwargs):
		self.init()

		# add subscription plan
		print("Adding subscription plan")
		SubscriptionPlan.objects.create(
			payment=7.99,
			interval="daily",
		)
		SubscriptionPlan.objects.create(
			payment=19.99,
			interval="weekly",
		)
		SubscriptionPlan.objects.create(
			payment=59.99,
			interval="monthly",
		)
		SubscriptionPlan.objects.create(
			payment=199.99,
			interval="yearly",
		)


		studios = Studio.objects.all()
		for studio in studios:
			# add some class to each studio

			print("Adding classes to studio {}".format(studio.name))

			for i in range(random.randint(1, self.max_class_per_studio)):

				class_start = datetime.datetime.now() + datetime.timedelta(days=random.randint(1, 50))
				days_inbetween = random.randint(5, 7)

				class_num = random.randint(0, len(self.classes) - 1)
				obj = Class.objects.create(
					studio=studio,
					name=self.classes[class_num][0],
					description=self.classes[class_num][1],
					coach=self.names[random.randint(0, len(self.names) - 1)],
					class_start=class_start,
					class_end=class_start + datetime.timedelta(days=random.randint(1, self.max_time_per_class) * days_inbetween),
					class_time=(datetime.datetime.now() + datetime.timedelta(minutes=random.randint(1, 150))).time(),
					duration=datetime.timedelta(hours=random.randint(1, 3)),
					days_inbetween=days_inbetween,
					spots=random.randint(1, self.max_spot_per_class),
				)

				# add some keywords to each class

				for i in range(random.randint(1, self.max_keywords_per_class)):
					keyword = self.keywords[random.randint(0, len(self.keywords) - 1)]
					Keywords.objects.create(
						classid=obj,
						keyword=keyword,
					)

			# add some amenity to each studio
			print("Adding amenities to studio {}".format(studio.name))

			for i in range(random.randint(1, self.max_amenity_per_studio)):
				amenity = self.amenities[random.randint(0, len(self.amenities) - 1)]
				Amenities.objects.create(
					studio=studio,
					amenity_type=amenity,
					quantity=random.randint(1, self.max_amenity_quantity),
				)

			# add some image to each studio
			print("Adding images to studio {}".format(studio.name))
			for i in range(random.randint(1, self.max_image_per_studio)):
				StudioImage.objects.create(
					studio=studio,
					image=ImageFile(open(PIC_DIR +
						self.pics[random.randint(0, len(self.pics) - 1)], 'rb')),
				)


			