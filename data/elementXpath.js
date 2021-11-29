exports.usernameInputXpath = "// input[ @ type = 'text']";

exports.passwordInputXpath = "// input[ @ type = 'password']";

exports.supportMenuXpath =
  "//ul[@class='font-size-11px nomgn-b no-bullet-point']";

exports.messageCenterXpath =
  "//div[@class='menu-behavior-link mgn-t5 mgn-l5 mgn-r5 pad-10 ng-scope']";

exports.otherLinksXpath =
  "//div[@class='menu-behavior-link mgn-t5 mgn-l5 mgn-r5 pad-10']";

exports.discussionPanelXpath =
  "//div[@class='reply-form new-thread']//form[@id='discussion_form']//div[@class='discussion-form-div-wrapper']//div[@class='discussion-textarea-wrapper with-no-image']//textarea[@id='discussion_post_textarea'] ";

exports.addImageXpath = "//div[@class='image-upload-div right']";

exports.iframeXpath =
  "//iframe[@src='https://widget.cloudinary.com/n/opencolleges/173/index.html?cloud_name=opencolleges']";

exports.browseButtonXpath = '//div[@class="upload_button_holder"]';

exports.previewImageXpath = '//div[@class="discussion-gallery-preview-div"]';

// exports.removeImageXpath =
//   '//i[@class="icon ico-oc-close os-color-gray font-size-11px"]';

exports.removeImageXpath =
  '//*[@id="discussion_form"]/div/div[3]/ul/li/div/span';

exports.imageCounterXpath =
  '//span[contains(text(), "1") and @class="image-count ng-binding"]';

exports.postButtonXpath =
  "//div[@class='discussion-post-wrapper']//button[@id='discussion_post_button']";

exports.postTextXpath =
  '//div[@class="show-for-medium-up"]//div[@class="ng-isolate-scope"]//div[@class="row show-for-medium-up"]//div[@class="columns medium-10"]//div[@class="row"]//div[@class="medium-12 columns nopad-l"]//div[@class="discussion-content-detail ng-binding closed"]';

exports.postImageXpath =
  "/html/body/div[2]/div[2]/div/div[2]/div/div/div/div/div/div/div/div[1]/div/div[2]/div/div[2]/div[3]/div[2]/div[3]/div[1]/div[1]/div[1]/div[1]/div/div[2]/div/div[4]/div/div/ul/li/a/img ";

exports.imageIconXpath =
  "/html/body/div[2]/div[2]/div/div[2]/div/div/div/div/div/div/div/div[1]/div/div[2]/div/div[2]/div[3]/div[2]/div[3]/div[1]/div[1]/div[1]/div[1]/div/div[2]/div/div[1]/div[2]/div/i ";

exports.replyPostWrapperXpath =
  "//div[@class='discussion_main_div os-cursor-pointer open-state']//textarea[@id='discussion_post_textarea']";

exports.replyPostAreaXpath =
  "//div[@class='discussion-textarea-wrapper with-no-image active']//textarea[@id='discussion_post_textarea']";

exports.replyTimeStampXpath =
  "//span[@class='os-color-gray font-size-12px ng-binding'][contains(text(),'1s')]";

exports.replyPostButtonXpath =
  "//div[@class='discussion-post-wrapper']//button[@id='discussion_post_button']";

exports.pofanityElementXpath =
  '//div[@class="profanity-message"]//p[@class="ng-binding"][contains(text(),"This message contains offensive language.Please edit before posting")]';

exports.commentXpath =
  "/html[1]/body[1]/div[2]/div[2]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[2]/div[3]/div[2]/div[3]/";

exports.totalCommentsXpath = '//*[@id="discussion"]/div[2]/div[1]/h3/span';

exports.closeMoreDiscussionXpath =
  '//div[@class="column small-3 close pointer"]//span[@class="close-span"][contains(text(),"Close")] ';

exports.courseMenuXpath =
  "//div[@id='overlayOpenDT']//i[@class='icon ico-oc-navigation']";

exports.courseHomePageXpath =
  '//*[@id="megaDropCtrkl"]/div/div/div[3]/div[1]/div/div[1]/div[2]/a[1]/div';

exports.courseOverviewXpath =
  "//div[@class='left title']//p[contains(text(),'Course Overview')]";

exports.module1Xpath =
  '//*[@id="megaDropCtrkl"]/div/div/div[3]/div[1]/div/div[1]/div[2]/div[1]';

exports.firstTopicXpath =
  '//*[@id="megaDropCtrkl"]/div/div/div[3]/div[2]/div/div[1]/div/div[1]';

exports.firstSubtopicXpath =
  '//*[@id="megaDropCtrkl"]/div/div/div[3]/div[3]/div/div[1]/div/div[1]';

exports.additionalResourcesXpath =
  '//*[@id="megaDropCtrkl"]/div/div/div[3]/div[1]/div/div[1]/div[2]/a[3]/div';

exports.additionalResourcesTitleXpath =
  "//h1[contains(text(),'Additional Resources')]";

exports.additionalResourcesSubTitleXpath = "//h4[@class='ng-binding']";

exports.additionalResourcesLinksXpath =
  '//*[@id="page-data"]/div/div[2]/div/div/ul/li[*]';

exports.moduleHelperXpath = '//*[@id="page-data"]/div/div[2]/div/div/ul/li[25]';

exports.moreDiscCommentElementXpath =
  "/html[1]/body[1]/div[2]/div[2]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[2]/div[3]/div[2]/div[3]/";

exports.moduleOverviewXpath =
  '//*[@id="megaDropCtrkl"]/div/div/div[3]/div[2]/div/div[1]/div/a/div';

exports.homeIconXpath = "//a[@class='os-color-gray font-size-11px no-deco']";

exports.module2Xpath =
  '//*[@id="megaDropCtrkl"]/div/div/div[3]/div[1]/div/div[1]/div[2]/div[2]';

exports.topicOverviewXpath =
  '//*[@id="megaDropCtrkl"]/div/div/div[3]/div[3]/div/div[1]/div/a[1]';

exports.firstAssessmentXpath =
  '//*[@id="megaDropCtrkl"]/div/div/div[3]/div[2]/div/div[1]/div/div[3]';

exports.moduleTwoAssessmentXpath =
  '//*[@id="megaDropCtrkl"]/div/div/div[3]/div[2]/div/div[1]/div/div[6]';

exports.teamUpBuddyXpath =
  '//*[@id="discussion-container"]/div[1]/div[2]/div/a/span';

exports.discussionsIconXpath =
  '//*[@id="discussion-container"]/div[1]/div[1]/h3';

exports.secondAssessmentXpath =
  '//*[@id="megaDropCtrkl"]/div/div/div[3]/div[2]/div/div[1]/div/div[7]/a[1]/div';

exports.assessmentTitleXpath =
  '//*[@id="page-data"]/div/div/assessment/div[1]/div/assessment-header/div[1]/div/div[1]/div[2]/div[1]/div[1]/h3';

exports.assessmentTipsXpath = '//*[@id="assessment-info"]/div[1]/div[2]';

exports.toolTipXpath =
  '//*[@id="page-data"]/div/div/motivatorview/div[1]/div[1]/div[2]/div[1]/div[1]/div/div[1]/div/div/div[2]/a/img';

exports.trainerNameXpath =
  '//*[@id="page-data"]/div/div/motivatorview/div[1]/div[1]/div[2]/div[1]/div[1]/div/div[1]/div/div/div[1]/div[2]/div/h6';

exports.trainerAvatarXpath = '//*[@id="trainer-avatar"]';

exports.trainerPositionXpath =
  "//p[@class='os-bold font-size-11px os-color-mid-green nomgn-b ng-binding']";

exports.messageButtonXpath =
  '//*[@id="page-data"]/div/div/motivatorview/div[1]/div[1]/div[2]/div[1]/div[1]/div/div[1]/div/div/div[1]/div[2]/a/div';

exports.messageSenderXpath =
  '//*[@id="message-centre-body"]/compose/div/div/div[2]/div[1]/div/div/input';

exports.messageSubjectXpath = "//input[@id='message_subject']";

exports.subtopicNumberXpath =
  "//div[@class='right native-content-sub-topic-num os-color-mid-green os-bg-white font-size-14px']";

exports.printTopicButtonXpath =
  "//span[@class='pdf-download-icon os-color-light-gray left']";

exports.myPaymentLinkXpath =
  '//*[@id="os_main_page_header"]/nav-bar/div/div/div[2]/div[2]/div[2]/div[1]/navbar-menu/div/div[1]/div/div[2]/div/div/div[7]';

exports.paymentHistoryXpath = '//*[@id="page-data"]/div/div[1]/div[2]';

exports.phoneNumberSectionXpath = '//*[@id="page-data"]/div/div[2]/div';

exports.supportCentreXpath =
  '//*[@id="support_menu"]/div/div[2]/div/div/div[2]/div[3]';

exports.studyBuddyXpath = '//*[@id="support-centre-react-div"]/div/div[6]';

exports.viewMoreQuestionsXpath =
  '//*[@id="page-data"]/div/div/div[5]/div/div/a';

exports.footerXpath = '//*[@id="global-footer"]';

exports.generalCourseContentXpath =
  '//*[@id="page-data"]/div/div[2]/div/div[7]';

exports.myGradesLinkXpath = '//*[@id="student_grade_link"]/div';

exports.myGradesCourseTitleXpath =
  '//*[@id="page-data"]/div/div[1]/div[4]/div[1]/p';

exports.profileMenuXpath =
  '//*[@id="os_main_page_header"]/nav-bar/div/div/div[2]/div[2]/div[2]/div[1]/navbar-menu/div/div[1]';

exports.previousPageXpath = '//*[@id="paginationSticky"]/div/div/div[1]';

exports.nextPageXpath = '//*[@id="paginationSticky"]/div/div/div[2]';

exports.searchButtonXpath =
  '//*[@id="os_main_page_header"]/nav-bar/div/div/div[2]/div[2]/div[2]/div[2]';

exports.searchInputXpath =
  "/html/body/div[2]/div[1]/nav-bar/div/div/div[2]/div[2]/div[2]/div[2]/div[2]/div/div/div[2]/div/div/div/div/form/div/div/input";

exports.firstLinkXpath =
  "/html/body/div[2]/div[1]/nav-bar/div/div/div[2]/div[2]/div[2]/div[2]/div[2]/div/div/div[2]/div/div/div/div/form/div/div/div/div[2]";

exports.myProfileXpath =
  '//*[@id="os_main_page_header"]/nav-bar/div/div/div[2]/div[2]/div[2]/div[1]/navbar-menu/div/div[1]/div/div[2]/div/div/div[3]';

exports.studentNameXpath = '//*[@id="about_me"]/div/div[2]/div[1]/div/div[1]';

exports.studentNumberXpath = '//*[@id="about_me"]/div/div[2]/div[1]/div/div[2]';

exports.changePasswordButtonXpath =
  '//*[@id="page-data"]/div/div/profile/profile-change-password/div/div/div/div[2]/div[2]/button';

exports.gradingPreferenceXpath =
  '//*[@id="page-data"]/div/div/profile/profile-sections/div/div/div[1]';

exports.gradingPreferenceEditButtonXpath =
  '//*[@id="page-data"]/div/div/profile/profile-sections/div/div/div[1]/div/div/div[1]/div[2]/div[1]/div[2]/div';

exports.gradingPreferenceSaveButtonXpath =
  '//*[@id="page-data"]/div/div/profile/profile-sections/div/div/div[1]/div/div/div[1]/div[2]/div[1]/div[1]/div';

exports.privacySettingXpath =
  '//*[@id="page-data"]/div/div/profile/profile-privacy-setting/div';

exports.studyBuddySettingsXpath = '//*[@id="rest_best"]';

exports.studyBuddySettingsEditButtonXpath =
  '//*[@id="edit_job_button"]/div[2]/div';

exports.studyBuddySettingsCancelButtonXpath =
  '//*[@id="rest_best"]/div/div[1]/div/div[2]/div[3]/div';

exports.downloadAssessmentXpath =
  '//*[@id="page-data"]/div/div/assessment/div[1]/div/assessment-header/div[1]/div/div[1]/div[2]/div[2]/div[1]';

exports.assessorHomeXpath =
  '//*[@id="trainerDashboardMain"]/div/div/div/trainer-dashboard-off-canvas/aside/ul/li[2]';

exports.assessorHomeInternalAnnouncementsXpath =
  '//*[@id="discussion"]/div[2]/div[3]/div[2]';

exports.assessorHomeTextAreaXpath = '//*[@id="discussion_post_textarea"]';

exports.assessorHomePostButtonXpath = '//*[@id="discussion_post_button"]';

exports.assessorHomeFirstCommentXpath =
  '//*[@id="discussion"]/div[2]/div[3]/div[2]/div[1]';

exports.assessorHomeLikeButtonXpath =
  '//*[@id="discussion"]/div[2]/div[3]/div[2]/div[1]/div[1]/div[1]/div[1]/div/div[2]/div/div[5]/div[1]';

exports.assessorHomeCommentTextAreaXpath =
  "/html/body/div[2]/div[2]/div/div[2]/div/div/trainer-dashboard/div/div/div/div/section/div/div/div/div/div/div[2]/div[3]/div[2]/div[1]/div[1]/div[1]/div[2]/div/div[2]/replyform/div/div/form/div/div[1]/textarea";

exports.assessorHomeCommentPostButtonXpath =
  "/html/body/div[2]/div[2]/div/div[2]/div/div/trainer-dashboard/div/div/div/div/section/div/div/div/div/div/div[2]/div[3]/div[2]/div[1]/div[1]/div[1]/div[2]/div/div[2]/replyform/div/div/form/div/div[5]/button";

exports.assessorOpenSpaceReleaseNotesXpath =
  '//*[@id="trainerDashboardMain"]/div/div/div/trainer-dashboard-off-canvas/aside/ul/li[3]';

exports.assessorOpenSpaceReleaseNotesContentXPath =
  '//*[@id="trainerReleaseNote"]/div[2]';

exports.assessorMessagesXpath =
  '//*[@id="trainerDashboardMain"]/div/div/div/trainer-dashboard-off-canvas/aside/ul/li[4]';

exports.assessorMessagesTabBarItemsXpath =
  "/html/body/div[2]/div[2]/div/div[2]/div/div/trainer-dashboard/div/div/div/div/section/div/div/messagecentre/div[2]/div/div[2]/div/div[1]/div[2]/div/";

exports.lastVisitedLinkXpath =
  "/html/body/div[2]/div[2]/div/div[2]/div/div/div/div/motivatorview/div[1]/div[1]/div[2]/div[3]/div/div/p/a";

exports.openSpaceTourXPath = '//*[@id="megadrop-onboarding-button"]/a';

exports.walkthroughMenuXpath = '//*[@id="overlayOpen"]/div';

exports.walkthroughModuleXpath =
  '//*[@id="megaDropCtrl"]/div/div/div[3]/div/div[6]/div/div[1]';

exports.walkthroughAssessmentXpath = '//*[@id="thisOne"]';

exports.walkthroughAssessmentNextButtonXpath =
  '//*[@id="page-data"]/div/div/assessment/div[1]/div/assessment-header/div[2]/div/div/div/div/div/div[2]/div/div/p[2]/a';

exports.walkthroughMessageNextButtonXpath =
  '//*[@id="page-data"]/div/div/motivatorview/div[2]/div[4]/div/div/div/div/div/div/div/div[1]/p[2]/a';

exports.walkthroughJumpInXpath =
  '//*[@id="page-data"]/div/div/motivatorview/div[2]/div[4]/div/div[1]';

exports.firstInboxMessageXpath = '//*[@id="bg2233710"]';

exports.messageSenderXpath =
  '//*[@id="message-pane"]/div[2]/div[1]/div[1]/div/span';

exports.logoutAsAssessorXpath =
  '//*[@id="trainerDashboardMain"]/div/div/div/trainer-dashboard-off-canvas/aside/ul/li[20]/a';
// --------------------Special path for JS operation--------------------
exports.jsDropFile =
  "var c=arguments,b=c[0],k=c[1];c=c[2];for(var d=b.ownerDocument||document,l=0;;){var e=b.getBoundingClientRect(),g=e.left+(k||e.width/2),h=e.top+(c||e.height/2),f=d.elementFromPoint(g,h);if(f&&b.contains(f))break;if(1<++l)throw b=Error('Element not interactable'),b.code=15,b;b.scrollIntoView({behavior:'instant',block:'center',inline:'center'})}var a=d.createElement('INPUT');a.setAttribute('type','file');a.setAttribute('multiple','');a.setAttribute('style','position:fixed;z-index:2147483647;left:0;top:0;');a.onchange=function(b){a.parentElement.removeChild(a);b.stopPropagation();var c={constructor:DataTransfer,effectAllowed:'all',dropEffect:'none',types:['Files'],files:a.files,setData:function(){},getData:function(){},clearData:function(){},setDragImage:function(){}};window.DataTransferItemList&&(c.items=Object.setPrototypeOf(Array.prototype.map.call(a.files,function(a){return{constructor:DataTransferItem,kind:'file',type:a.type,getAsFile:function(){return a},getAsString:function(b){var c=new FileReader;c.onload=function(a){b(a.target.result)};c.readAsText(a)}}}),{constructor:DataTransferItemList,add:function(){},clear:function(){},remove:function(){}}));['dragenter','dragover','drop'].forEach(function(a){var b=d.createEvent('DragEvent');b.initMouseEvent(a,!0,!0,d.defaultView,0,0,0,g,h,!1,!1,!1,!1,0,null);Object.setPrototypeOf(b,null);b.dataTransfer=c;Object.setPrototypeOf(b,DragEvent.prototype);f.dispatchEvent(b)})};d.documentElement.appendChild(a);a.getBoundingClientRect();return a; ";

exports.testFilepath = "/testfiles/discussion_panel.jpeg";
