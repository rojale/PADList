from requests_html import HTMLSession

import json

def getStatRowInfo(monster, row):
	row_tds = row.find("td")
	row_type = row_tds[0].attrs.get('class', '')
	if 'stathp' in row_type:
		monster['hp'] = row_tds[2].text
	if 'statatk' in row_type:
		monster['atk'] = row_tds[2].text
	if 'statrcv' in row_type:
		monster['rcv'] = row_tds[2].text
	return monster


def getProfileRowInfo(monster, row):
	row_tds = row.find("td")
	row_type = row_tds[0].text
	if row_type == "Type:":
		type_as = row.find("a")
		monster_types = []
		for type_a in type_as:
			monster_types.append(type_a.text)
		monster['types'] = monster_types
	if row_type == "Element:":
		element_as = row.find("a")
		monster_elements = []
		for element_a in element_as:
			monster_elements.append(element_a.text)
		monster['elements'] = monster_elements

	return monster


base_url = "http://www.puzzledragonx.com/en/monsterbook.asp"

session = HTMLSession()


awoken_skills_list = {}

awoken_url = 'http://www.puzzledragonx.com/en/awokenskill-list.asp?s=3'

awoken_page = session.get(awoken_url)

awoken_as = awoken_page.html.find("a")

for awoken_a in awoken_as:
	if 'href' in awoken_a.attrs:
		if 'awokenskill-list.asp?s=' in awoken_a.attrs['href']:
			awoken_skill_index = awoken_a.attrs['href'].split("=")[1]
			inner_img = awoken_a.find("img", first=True)
			if inner_img is None:
				continue
			awoken_skill_name = inner_img.attrs['title']
			awoken_skills_list[awoken_skill_index] = awoken_skill_name

if '64' not in awoken_skills_list:
	awoken_skills_list['64'] = 'Combo Orb'

with open('as_data.json', 'w') as output_file:
	json.dump(awoken_skills_list, output_file)

monster_index = session.get(base_url)

indexframes = monster_index.html.find(".indexframe")

monsters = []

monster_types = []

start_url = "http://www.puzzledragonx.com/en/"
for indexframe in indexframes:
	monster = {}
	monster_a = indexframe.find("a", first=True)
	monster_link = monster_a.attrs['href']
	if monster_link is None:
		continue
	if 'monster' not in monster_link:
		continue
	monster_url = start_url + monster_link
	print ("parsing url, ", monster_url)
	monster_page = session.get(monster_url)
	monster_html = monster_page.html
	stat_table = monster_html.find("#tablecustom", first=True)

	stat_rows = stat_table.find("tr")

	for stat_row in stat_rows:
		monster = getStatRowInfo(monster, stat_row)
	name_div = monster_html.find(".name", first=True)
	name_h1 = name_div.find("h1", first=True)
	monster['name'] = name_h1.text
	profile_table = monster_html.find(".tableprofile", first=True)
	profile_rows = profile_table.find("tr")
	for profile_row in profile_rows:
		monster = getProfileRowInfo(monster, profile_row)
	for type in monster['types']:
		if type not in monster_types:
			monster_types.append(type)	
	skill_cd = monster_html.search("Turns ( {} Turns at Lv.")
	if skill_cd is not None:
		monster['skill_cd'] = skill_cd[0]
	monster['link'] = monster_url

	awoken1_rows = monster_html.find(".awoken1")
	awoken_skills = []
	for awoken1_row in awoken1_rows:
		skill_links = awoken1_row.absolute_links
		for link in skill_links:
			if 'awokenskill.asp?s=' in link:
				skill_index = link.split("=")[1]
				skill_name = awoken_skills_list.get(skill_index, None)
				if skill_name is None:
					continue
				awoken_skills.append(skill_name)
	monster['awoken_skills'] = awoken_skills

	print(monster)
	monsters.append(monster)

with open('types_data.json', 'w') as output_file:
	json.dump(monster_types, output_file)

with open('monster_data.json', 'w') as output_file:
	json.dump(monsters, output_file)