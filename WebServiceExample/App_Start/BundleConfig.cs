using System.Web;
using System.Web.Optimization;

namespace WebServiceExample
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js",
                        "~/Scripts/jquery.mousewheel-3.0.6.pack.js",        //1 Add mousewheel plugin (this is optional)                       
                        "~/Scripts/jquery.fancybox.pack.js",                //3 Add fancyBox                        
                        "~/Scripts/jquery.fancybox-buttons.js",             //5 Optionally add helpers - button, thumbnail and/or media
                        "~/Scripts/jquery.fancybox-media.js",               //6 Optionally add helpers - button, thumbnail and/or media                     
                        "~/Scripts/jquery.fancybox-thumbs.js"               //8 Optionally add helpers - button, thumbnail and / or media
                        ));

            //bundles.Add(new ScriptBundle("~/bundles/fancyScripts").Include(
            //            "~/Scripts/jquery.mousewheel-3.0.6.pack.js",        //1 Add mousewheel plugin (this is optional)                       
            //            "~/Scripts/jquery.fancybox.pack.js",                //3 Add fancyBox                        
            //            "~/Scripts/jquery.fancybox-buttons.js",             //5 Optionally add helpers - button, thumbnail and/or media
            //            "~/Scripts/jquery.fancybox-media.js",               //6 Optionally add helpers - button, thumbnail and/or media                     
            //            "~/Scripts/jquery.fancybox-thumbs.js"               //8 Optionally add helpers - button, thumbnail and / or media
            //            ));

            //bundles.Add(new StyleBundle("~/bundles/fancyStyles").Include(
            //            "~/Content/jquery.fancybox.css",                    //2 Add fancyBox 
            //            "~/Content/jquery.fancybox-buttons.css",            //4 Optionally add helpers - button, thumbnail and/or media
            //            "~/Content/jquery.fancybox-thumbs.css"              //7 Optionally add helpers - button, thumbnail and/or media
            //            ));

            bundles.Add(new ScriptBundle("~/bundles/myJquery").Include(
                        "~/Scripts/main.js"
                        ));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/respond.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/jquery.fancybox.css",                    //2 Add fancyBox 
                      "~/Content/jquery.fancybox-buttons.css",            //4 Optionally add helpers - button, thumbnail and/or media
                      "~/Content/jquery.fancybox-thumbs.css",             //7 Optionally add helpers - button, thumbnail and/or media
                      "~/Content/owfont-regular.css",             
                      "~/Content/site.css"));
        }
    }
}
