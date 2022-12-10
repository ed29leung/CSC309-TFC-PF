import json

text = """3D30 	3D30® is a revolutionary strength and cardio workout utilizing the ViPR, loaded three-dimensional training, and phases of HIIT to improve athletic performance.
Active Agers  	This class includes low-impact cardio, gentle strength training and balance exercises for a functional and fun workout. Designed for adults 55+. 
Aquafit 	An invigorating class that combines cardiovascular and strength conditioning in the water. 
Aquafit Deep  	An invigorating class that combines cardiovascular and strength conditioning in the water (deep water).
Aquafit Shallow 	An invigorating class that combines cardiovascular and strength conditioning in the water (shallow water). 
Baby and Me Fitness 	Designed for babies 3 – 12 months and their caregivers, this class uses bodyweight, baby resistance, and resistance band exercises in a fun, safe and welcoming environment. Please note the workout is intended for the caregiver, not the child. 
Balance 	This class includes a series of exercises designed to challenge your balance and stability, with plenty of options for all levels. 
Barbell Fit  	Improve your muscular endurance and strength using barbells and plates in this class. 
Body Blend  	A multi-level workout combining high intensity and low impact movements and ends with resistance and flexibility exercises. Suitable for all ages. 
Boot Camp 	A cardio and strength workout using a variety of weighted and body weight moves to keep you challenged and motivated. 
Cardio Dance 	A welcoming, judgement-free space where you can dance and work out like no one’s watching. This class incorporates popular dance moves for a one-of-a-kind fitness experience! 
Chair Yoga  	This yoga class is performed while seated in a chair or standing with the assistance of a chair. Great for active older adults and for those who are unable to get up and down from the floor. 
Chairfit 	This class develops cardio, strength and flexibility in a seated position. 
Circuit Training 	This full body workout alternates between using different muscle groups with minimal rest to build strength. This class will keep your heart pumping and rev up your metabolism. 
Core Strength and Stretch  	A full body workout with a focus on the core that will improve strength, increase flexibility, and help prevent injury. 
Cycle  	A cardiovascular workout guiding you through a variety of intense exercise levels. Water bottle and towel recommended. 
Cycle and Core 	A combination of our traditional cycling and core classes combined into one.  
Cycle, Strength, and Stretch  	In this class, you will enjoy a traditional cycling class with the addition of muscle conditioning, followed by a restorative stretch.
Dance Fit  	This class is a fusion of high energy and motivating music with easy-to-follow dance and fitness moves to keep you moving and raise your heart rate.  No previous dance experience required.
Essentrics  	A dynamic full body workout that simultaneously combines stretching and strengthening. 
Gentle Joints  	A slower-paced aquafit class, focusing on strength and conditioning with an emphasis on joint health and support.  
Gentle Yoga  	Gentle yoga movements at a slower pace. Most of the class is in supported positions, either seated or lying down. Chair options are provided. This class is suitable for all levels and great for beginners. 
Group Active  	Group Active® is an innovative workout that improves cardio fitness, total-body strength, and Movement Health with dumbbells, body weight, and The STEP®. 
Group Blast  	Group Blast® is an athletic cardio workout that uses The STEP® to improve agility, coordination, fitness, and strength. 
Group Centergy  	Group Centergy® is an invigorating mind-body workout incorporating yoga and Pilates fundamentals with athletic training for balance, mobility, flexibility, and strength. 
Group Core 	Group Core® is a three-dimensional strength training workout that includes integrated exercises using body weight and weight plates to improve athletic performance. 
Group Fight 	Group Fight® is a gripping cardio workout that taps into the hottest MMA movements done at a rapid-fire pace to improve fitness and total-body strength. 
Group Groove  	Group Groove® is an energizing dance fitness workout that is a fusion of club, urban, and Latin dance styles set to the hottest hits. 
Group Power  	Group Power® is a cutting-edge workout that includes traditional strength exercises and integrated multi-planar exercises with a barbell, plates, and body weight to get muscle and movement strong. 
Group Ride  	Group Ride® is a cardio workout based on a cycling experience which improves fitness and muscular endurance by rolling over hills, chasing the pack, climbing mountains, and sprinting to the finish. 
Instructors Choice 	Holiday – Please see in-branch schedules for details. 
Interval Training (H.I.I.T.) 	Challenge your body in this class with high intensity movements designed to improve conditioning. Classes can use light weights, accessories, and bodyweight exercises. 
Kettlebell  	In this class you will increase strength, power, speed, coordination, and core stability using kettlebells.  
Kickboxing  	Build stamina, improve coordination and flexibility, and burn calories with this fun and challenging workout. 
Light and Lively 	A fun fitness class which includes low impact cardio, functional strength, balance, and flexibility. 
Line Dancing 	This class includes basic instruction of the moves and steps involved in line dancing. Get ready to have some fun. 
Move30 	MOVE30® is an innovative Movement Health program that improves strength, mobility, and balance. 
Pilates 	Focus on strength, stability, posture, flexibility, and breath control in this full body workout. 
Power Yoga  	In this yoga class, you will move from posture to posture at a more vigorous pace requiring strength and endurance. This class includes sequences with push-ups, planks, and balance poses. Some yoga experience is recommended. 
Rumba  	Improve your cardio and overall fitness with this dance-inspired class (Latin and hip hop music). 
Run Club 	This is a run-walk program designed for NEW runners or those looking to get back into running. By the end of the program, most can run a 5k. 
Step 	A classic cardio workout using a height adjustable step. Participants will step up, around, and down from the platform in different patterns to boost heart rate, improve cardiovascular fitness, and strengthen muscles.
Strength and Stretch  	Resistance training using bodyweight and dumbbell exercises to develop strength and mobility, followed by an extended full-body stretch. 
Stretch  	In this class you will increase flexibility, improve posture, and reduce muscle and joint pain with a dedicated full body stretch. 
Strong By Zumba 	This class combines body weight, muscle conditioning, cardio and plyometric training synced to original music that has been specifically designed to match every single move. 
Suspension Training  	In this class you will develop strength, balance, flexibility, and core stability using the TRX suspension trainer. 
Tai Chi 	Learn the basic moves and steps of Tai Chi, while improving focus, balance, and mobility. 
Total Body Conditioning  	A full body strength-focused workout, using dumbbells, accessories, and bodyweight exercises. 
Turf Time  	Incorporates fun and functional rig equipment and more. Participants will learn more about the rig equipment while getting a full body workout. 
Water Walking  	Water walking is a self-led low-intensity cardio class held in the small pool. During the half-hour class, music is on and there are prompts posted around the pool for participants to utilize if they wish. 15 minutes clockwise, 15 minutes counterclockwise. 
Women on Weights (13+)  	This course is designed specifically for educating women on resistance training including up-to-date fitness information, proper exercise techniques, safety and motivation. 
Yoga  	Techniques focus on posture, breathing and meditation. Participants will gain strength and flexibility, as well as develop mind and body relaxation. 
Youth Fitness (10+)  	This program is designed to teach youth the fundamentals of working out and the safe and proper use of fitness equipment. Successful completion of this program will allow participants to access the fitness centre with adult accompaniment. 
Zumba  	This class fuses hypnotic Latin and International rhythms with easy-to-follow moves to create a dynamic workout. 
"""

text1 = [i.strip().strip('\xa0') for i in text.replace('\n', '\t').split('\t')]

index = dict()

for i in range(0, len(text1) - 1, 2):
    index[text1[i]] = text1[i+1]

with open('class.json', 'w') as f:
    json.dump(index, f, indent=4)